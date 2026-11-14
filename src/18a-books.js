/* ---------- Livros em PDF: usados pela Escrita e pelo Livro didático ----------
   Os PDFs ficam guardados só no navegador da pessoa (IndexedDB). Nunca viram parte do app nem são enviados a lugar nenhum. */
const BK_PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const BK_PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
let bkLibP = null;
function bkLoadLib(){
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (bkLibP) return bkLibP;
  bkLibP = new Promise((ok, no) => {
    const sc = document.createElement("script"); sc.src = BK_PDFJS;
    sc.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = BK_PDFJS_WORKER; ok(window.pdfjsLib); };
    sc.onerror = () => { bkLibP = null; no(new Error("lib")); };
    document.head.appendChild(sc);
  });
  return bkLibP;
}
function bkIdb(){ return new Promise((ok, no) => { try { const r = indexedDB.open("mapa-idiomas-pdf", 1); r.onupgradeneeded = () => r.result.createObjectStore("f"); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); } catch (e) { no(e); } }); }
function bkIdbGet(k){ return bkIdb().then(db => new Promise((ok, no) => { const q = db.transaction("f").objectStore("f").get(k); q.onsuccess = () => ok(q.result); q.onerror = () => no(q.error); })); }
function bkIdbSet(k, v){ return bkIdb().then(db => new Promise((ok, no) => { const t = db.transaction("f", "readwrite"); t.objectStore("f").put(v, k); t.oncomplete = () => ok(); t.onerror = () => no(t.error); })); }
function bkIdbDel(k){ return bkIdb().then(db => new Promise((ok, no) => { const t = db.transaction("f", "readwrite"); t.objectStore("f").delete(k); t.oncomplete = () => ok(); t.onerror = () => no(t.error); })); }
function bkShuffle(a){ a = a.slice(); for (let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; } return a; }

/* tamanho de cada página (uma página do PDF pode ser uma dupla = 2 páginas do livro); com texto: palavras em cada metade */
async function bkAnalyse(doc, withText){
  const pages = [];
  for (let n = 1; n <= doc.numPages; n++){
    const pg = await doc.getPage(n), vp = pg.getViewport({scale:1});
    const spread = vp.width / vp.height > 1.05, w = {L:0, R:0};
    let first = "";
    if (withText){
      const tc = await pg.getTextContent(), mid = vp.width / 2;
      tc.items.forEach((it, k) => { const t = (it.str || "").trim(); if (!t) return; if (k < 3) first += " " + t;
        const words = t.split(/\s+/).length, x = it.transform ? it.transform[4] : 0;
        if (spread && x >= mid) w.R += words; else w.L += words; });
    }
    pages.push({n, spread, L:w.L, R:w.R, first:first.trim()});
  }
  return pages;
}
function bkDetectRange(pages){
  // páginas de texto corrido: muitas palavras e sem cara de índice, glossário ou exercício. Escolhe a maior sequência delas.
  const bad = /glossary|points for understanding|exercises|contents|picture dictionary|people in these|grammar|vocabulary|index|copyright|answer key/i;
  const ask = /^\d+\s+(why|what|how|who|where|which|read|write|match|complete|choose|put|tick|find|look|use|make)\b/i;
  const ok = pg => { const f = pg.first;
    if ((pg.L + pg.R) < 150 || bad.test(f) || ask.test(f)) return false;
    if (/^\d/.test(f) && !/^\d+\s+[A-Z][a-z]/.test(f)) return false;
    return true; };
  let best = [0,-1], cur = null;
  pages.forEach((pg, i) => { if (ok(pg)){ if (!cur) cur = [i,i]; else cur[1] = i; if (cur[1]-cur[0] > best[1]-best[0]) best = cur.slice(); } else cur = null; });
  if (best[1]-best[0] < 2) return [1, pages.length];
  return [pages[best[0]].n, pages[best[1]].n];
}

function mkBooks(cfg){
  const K = cfg.key, el = id => document.getElementById(id);
  const M = {doc:null, info:null, docId:"", busy:false, err:"", adding:false, session:[], done:false, canvas:null, canvasKey:""};
  const bks = p => {
    if (cfg.legacy && p.wrPdf && !p[K+"Books"]){ p[K+"Books"] = [{id:"pdf", name:p.wrPdf.name, from:p.wrPdf.from, to:p.wrPdf.to, n:p.wrPdf.n}]; p[K+"Book"] = "pdf"; delete p.wrPdf; }
    if (!p[K+"Books"]) p[K+"Books"] = [];
    if (!p[K+"Seen"]) p[K+"Seen"] = {};
    const l = p[K+"Books"];
    if (l.length && !l.some(b => b.id === p[K+"Book"])) p[K+"Book"] = l[0].id;
    return l;
  };
  const cur = p => bks(p).find(b => b.id === p[K+"Book"]) || null;
  const idbKey = b => b.id === "pdf" ? "pdf" : K + ":" + b.id;
  const dailyN = p => p[K+"Daily"] && p[K+"Daily"].date === T ? p[K+"Daily"].n : 0;
  const clearSeen = (p, id) => { Object.keys(p[K+"Seen"]).forEach(k => { if (k.indexOf(id + ":") === 0) delete p[K+"Seen"][k]; }); };
  const available = () => cfg.available ? cfg.available() : true;

  async function openBuffer(buf, book, fresh, name){
    const lib = await bkLoadLib();
    const doc = await lib.getDocument({data: buf.slice(0)}).promise;
    const info = await bkAnalyse(doc, cfg.mode === "text");
    M.doc = doc; M.info = info; M.docId = idbKey(book); book.n = doc.numPages;
    if (name) book.name = name;
    if (fresh){ const r = cfg.mode === "text" ? bkDetectRange(info) : [1, doc.numPages]; book.from = r[0]; book.to = r[1]; }
    else { book.to = Math.min(book.to, book.n); book.from = Math.min(book.from, book.to); }
  }
  async function importFile(file, title, rep){
    M.err = ""; M.busy = true; renderStage();
    const p = P(), list = bks(p);
    const book = rep || {id: Date.now().toString(36), name:"", from:1, to:1, n:0};
    const name = (title || "").trim() || (rep && rep.name) || file.name.replace(/\.pdf$/i, "");
    try {
      const buf = await file.arrayBuffer();
      await openBuffer(buf, book, true, name);
      try { await bkIdbSet(idbKey(book), buf); } catch (e) { M.err = "O PDF abriu, mas este navegador não deixou guardá-lo: você vai precisar carregar de novo da próxima vez."; }
      if (!rep) list.push(book);
      clearSeen(p, book.id); p[K+"Book"] = book.id; M.adding = false; M.session = []; M.canvas = null; save();
    } catch (e) {
      M.err = e && e.message === "lib" ? "Não consegui carregar o leitor de PDF (internet bloqueada?). Tente de novo com a internet liberada." : "Não consegui ler esse arquivo como PDF.";
    }
    M.busy = false; renderStage();
  }
  async function ensureDoc(book){
    if (M.doc && M.docId === idbKey(book)) return true;
    try { const buf = await bkIdbGet(idbKey(book)); if (!buf) return false; await openBuffer(buf, book, false); return true; } catch (e) { return false; }
  }
  function candidates(book){
    const out = [];
    M.info.forEach(pg => { if (pg.n < book.from || pg.n > book.to) return;
      if (cfg.mode === "text"){
        if (pg.spread){ if (pg.L >= 80) out.push({n:pg.n, half:"L"}); if (pg.R >= 80) out.push({n:pg.n, half:"R"}); }
        else if (pg.L >= 80) out.push({n:pg.n, half:"S"});
      } else if (pg.spread){ out.push({n:pg.n, half:"L"}, {n:pg.n, half:"R"}); }
      else out.push({n:pg.n, half:"S"}); });
    return out;
  }
  function pick(p, book){
    const seen = p[K+"Seen"], c = candidates(book).map(x => Object.assign(x, {id: book.id + ":" + x.n + x.half}));
    if (!c.length) return [];
    let fresh = c.filter(x => !seen[x.id]);
    if (!fresh.length){ c.forEach(x => delete seen[x.id]); fresh = c; }
    return [bkShuffle(fresh)[0]];
  }
  async function drawPage(item, holder){
    const key = item.id; holder.innerHTML = '<p class="note">Carregando a página…</p>';
    try {
      const pg = await M.doc.getPage(item.n), vp1 = pg.getViewport({scale:1});
      const half = item.half === "S" ? 1 : 0.5, cssW = M.full ? Math.min(((holder.clientWidth || 900) - 24) * (M.zoom || 1), 2200) : Math.min(holder.clientWidth || 640, 720);
      const scale = (cssW / (vp1.width * half)) * Math.min(2, window.devicePixelRatio || 1);
      const vp = pg.getViewport({scale}), off = document.createElement("canvas");
      off.width = Math.ceil(vp.width); off.height = Math.ceil(vp.height);
      await pg.render({canvasContext: off.getContext("2d"), viewport: vp}).promise;
      const cv = document.createElement("canvas"), sx = item.half === "R" ? Math.floor(off.width / 2) : 0, sw = Math.floor(off.width * half);
      cv.width = sw; cv.height = off.height; cv.className = "wrcanvas"; cv.setAttribute("role", "img"); cv.setAttribute("aria-label", "Página do seu livro");
      cv.getContext("2d").drawImage(off, sx, 0, sw, off.height, 0, 0, sw, off.height);
      M.canvas = cv; M.canvasKey = key; M.canvasSig = (M.full ? "F" + (M.zoom || 1) : "N");
      if (M.session[0] && M.session[0].id === key){ holder.innerHTML = ""; holder.appendChild(cv); }
    } catch (e) { holder.innerHTML = '<p class="note">Não consegui desenhar esta página. Clique em "Outra página".</p>'; }
  }
  function complete(){
    const p = P(); bks(p);
    M.session.forEach(x => { p[K+"Seen"][x.id] = T; });
    p[K+"Daily"] = {date:T, n: dailyN(p) + 1};
    p[K+"Count"] = (p[K+"Count"] || 0) + 1;
    if (cfg.onComplete) cfg.onComplete(p);
    updateLog(); save(); checkProgress();
    M.done = true; M.canvas = null;
    renderStage(); renderIntro(); window.scrollTo({top:0});
  }
  function importBox(p, hasBooks){
    return `<div class="wrimport"><p>${cfg.importText}</p>
      <label for="${K}BookT" class="wrlbl">Título do livro</label><input type="text" id="${K}BookT" class="wrtitle" maxlength="80" placeholder="${esc(cfg.titleHint)}" autocomplete="off">
      <label class="btnp wrfile" for="${K}File">Escolher PDF</label><input type="file" id="${K}File" accept="application/pdf,.pdf" hidden>
      ${hasBooks ? `<button type="button" class="btng" id="${K}AddCancel" style="margin-left:8px">Cancelar</button>` : ""}
      ${M.err ? `<p class="wrerr">${esc(M.err)}</p>` : ""}</div>`;
  }
  function wireImport(hasBooks){
    el(K+"File").onchange = e => { if (e.target.files[0]) importFile(e.target.files[0], el(K+"BookT").value, null); };
    const c = el(K+"AddCancel"); if (c) c.onclick = () => { M.adding = false; M.err = ""; renderStage(); };
  }
  function pickerHtml(p, list){
    return `<div class="bkpick"><label for="${K}Sel">Livro</label><select id="${K}Sel">${list.map(b => `<option value="${esc(b.id)}"${b.id === p[K+"Book"] ? " selected" : ""}>${esc(b.name)}</option>`).join("")}<option value="__add">＋ Adicionar outro livro</option></select></div>`;
  }
  const delHtml = () => `<div class="bkdelrow"><button type="button" class="btng bkdel" id="${K}DelTop">Excluir este livro</button></div>`;
  function wirePicker(p){
    const s = el(K+"Sel"); if (!s) return;
    const dt = el(K+"DelTop"), cb = cur(p);
    if (dt && cb){ let armed = false;
      dt.onclick = () => { if (!armed){ armed = true; dt.textContent = "Clique de novo para excluir"; setTimeout(() => { armed = false; if (dt.isConnected) dt.textContent = "Excluir este livro"; }, 3500); return; } removeBook(p, cb); }; }
    s.onchange = () => { if (s.value === "__add"){ M.adding = true; M.err = ""; } else { p[K+"Book"] = s.value; M.session = []; M.canvas = null; M.err = ""; save(); } renderStage(); };
  }
  async function removeBook(p, b){
    try { await bkIdbDel(idbKey(b)); } catch (e) {}
    const l = bks(p); l.splice(l.indexOf(b), 1); clearSeen(p, b.id);
    M.doc = null; M.info = null; M.docId = ""; M.canvas = null; M.session = []; M.adding = false; M.err = "";
    p[K+"Book"] = l.length ? l[0].id : ""; save(); renderStage(); renderIntro();
  }
  function settingsHtml(b){
    return `<details class="wrset"><summary>Ajustar este livro</summary>
      <p class="note"><label for="${K}BookT2">Título do livro</label> <input type="text" id="${K}BookT2" class="wrtitle" maxlength="80" value="${esc(b.name)}"></p>
      <p class="note">${cfg.rangeText} <input type="number" id="${K}From" min="1" max="${b.n}" value="${b.from}"> até <input type="number" id="${K}To" min="1" max="${b.n}" value="${b.to}"> (o PDF tem ${b.n}).</p>
      <div class="wrtools"><button type="button" class="btng" id="${K}SaveRange">Salvar título e páginas</button>
        <label class="btng wrfile" for="${K}File2">Trocar o PDF deste livro</label><input type="file" id="${K}File2" accept="application/pdf,.pdf" hidden></div></details>`;
  }
  function wireSettings(p, b){
    const sv = el(K+"SaveRange"); if (!sv) return;
    sv.onclick = () => {
      const f = Math.max(1, +el(K+"From").value || 1), t = Math.min(b.n, +el(K+"To").value || b.n), nm = el(K+"BookT2").value.trim();
      if (nm) b.name = nm; b.from = Math.min(f, t); b.to = Math.max(f, t); clearSeen(p, b.id); M.session = []; M.canvas = null; save(); renderStage(); };
    el(K+"File2").onchange = e => { if (e.target.files[0]) importFile(e.target.files[0], el(K+"BookT2").value, b); };
  }
  function closeFull(){ M.full = false; M.canvas = null; document.body.classList.remove("bkfullon"); renderStage(); }
  document.addEventListener("keydown", e => { if (!M.full) return; if (e.target && e.target.tagName === "INPUT" && e.key !== "Escape") return;
    if (e.key === "Escape"){ e.stopImmediatePropagation(); e.preventDefault(); closeFull(); }
    else if (e.key === "ArrowRight" || e.key === "ArrowLeft"){ const b = el(K+(e.key === "ArrowRight" ? "Next" : "Prev")); if (b){ e.preventDefault(); b.click(); } } }, true);
  function renderStage(){
    const body = el(cfg.body), head = el(cfg.head); if (!body) return;
    const p = P(), list = bks(p), n = dailyN(p);
    if (head) head.textContent = n ? `${n} página${n>1?"s":""} hoje` : "";
    if (M.done){
      body.innerHTML = `<div class="exsessiondone"><div class="exsessiondoneic">✓</div><b>${cfg.doneTitle}</b>
        <p class="note">${cfg.doneNote}</p>
        <div class="exchoice"><button type="button" class="btnp exchoicebtn" id="${K}More">${cfg.moreLabel}</button><button type="button" class="btng exchoicebtn" id="${K}ToMap">Voltar ao mapa</button></div></div>`;
      el(K+"More").onclick = () => { M.session = []; M.done = false; renderStage(); window.scrollTo({top:0}); };
      el(K+"ToMap").onclick = close;
      return;
    }
    if (M.busy){ body.innerHTML = `<p class="note">Lendo o PDF… isso leva alguns segundos.</p>`; return; }
    if (!list.length || M.adding){ body.innerHTML = (list.length ? pickerHtml(p, list) : "") + importBox(p, list.length > 0) + (list.length ? delHtml() : ""); wirePicker(p); wireImport(list.length > 0); return; }
    const b = cur(p), pk = pickerHtml(p, list);
    if (!M.doc || M.docId !== idbKey(b)){
      body.innerHTML = pk + `<p class="note">Abrindo ${esc(b.name)}…</p>`; wirePicker(p);
      ensureDoc(b).then(ok => { if (ok) renderStage(); else { M.err = "Não encontrei mais este PDF guardado neste navegador. Carregue de novo."; M.adding = false; list.splice(list.indexOf(b), 1); p[K+"Book"] = list.length ? list[0].id : ""; save(); renderStage(); } });
      return;
    }
    if (!M.session.length || !M.session[0].n) M.session = pick(p, b);
    if (!M.session.length){ body.innerHTML = pk + `<p class="note">Nenhuma página nesse intervalo. Ajuste as páginas abaixo.</p>` + settingsHtml(b) + delHtml(); wirePicker(p); wireSettings(p, b); return; }
    const it = M.session[0], lado = it.half === "L" ? "página da esquerda" : it.half === "R" ? "página da direita" : "página inteira";
    body.innerHTML = pk + `<ol class="wrsteps">${cfg.steps}</ol>
      <p class="wrpart">${esc(b.name)} · PDF página ${it.n} · ${lado}</p>
      ${M.full ? "" : `<div class="wrcanvashold" id="${K}Hold"></div>`}
      <div class="wrtools bknav">${M.full ? "" : `<button type="button" class="btng" id="${K}Prev" aria-label="Página anterior">◀ Anterior</button><button type="button" class="btng" id="${K}Next" aria-label="Próxima página">Próxima ▶</button>`}<button type="button" class="btng" id="${K}Other">Outra página</button>
        <button type="button" class="btng" id="${K}Full" aria-label="Ver em tela cheia">⛶ Tela cheia</button>
        ${M.full ? "" : `<label class="bkgo">Ir para a página <input type="number" id="${K}Go" min="${b.from}" max="${b.to}" inputmode="numeric" placeholder="${it.n}"></label><button type="button" class="btng" id="${K}GoBtn">Ir</button>`}</div>
      <button type="button" class="btnp wrfinish" id="${K}Finish">${cfg.finishLabel}</button>
      ${M.err ? `<p class="wrerr">${esc(M.err)}</p>` : ""}${settingsHtml(b)}${delHtml()}
      ${M.full ? `<div class="bkfull" id="${K}FullBox" role="dialog" aria-label="Livro em tela cheia">
        <div class="bkfbar"><span class="bkft">${esc(b.name)} · p. ${it.n}</span>
          <button type="button" class="btng" id="${K}Prev" aria-label="Página anterior">◀</button><button type="button" class="btng" id="${K}Next" aria-label="Próxima página">▶</button>
          <label class="bkfgo">Página <input type="number" id="${K}Go" min="${b.from}" max="${b.to}" inputmode="numeric" placeholder="${it.n}"></label><button type="button" class="btng" id="${K}GoBtn">Ir</button>
          <button type="button" class="btng" id="${K}ZoomOut" aria-label="Diminuir">−</button><button type="button" class="btng" id="${K}ZoomIn" aria-label="Aumentar">+</button>
          <button type="button" class="btnp" id="${K}FullClose">Fechar ✕</button></div>
        <div class="bkfscroll" id="${K}Hold"></div></div>` : ""}`;
    wirePicker(p); wireSettings(p, b);
    el(K+"Other").onclick = () => { M.session = pick(p, b); renderStage(); };
    el(K+"Finish").onclick = complete;
    const goTo = d => { const c = candidates(b).map(x => Object.assign(x, {id: b.id + ":" + x.n + x.half})); if (!c.length) return;
      let i = c.findIndex(x => x.id === it.id); if (i < 0) i = 0; i = Math.max(0, Math.min(c.length - 1, i + d)); if (c[i].id === it.id) return; M.session = [c[i]]; M.canvas = null; renderStage(); };
    el(K+"Full").onclick = () => { M.full = true; M.zoom = 1; M.canvas = null; renderStage(); };
    if (M.full){ document.body.classList.add("bkfullon"); el(K+"FullClose").onclick = closeFull;
      el(K+"ZoomIn").onclick = () => { M.zoom = Math.min(2.5, (M.zoom || 1) + 0.25); M.canvas = null; renderStage(); };
      el(K+"ZoomOut").onclick = () => { M.zoom = Math.max(0.5, (M.zoom || 1) - 0.25); M.canvas = null; renderStage(); }; }
    else document.body.classList.remove("bkfullon");
    el(K+"Prev").onclick = () => goTo(-1); el(K+"Next").onclick = () => goTo(1);
    const go = () => { const v = parseInt(el(K+"Go").value, 10); if (!v) return; const c = candidates(b).map(x => Object.assign(x, {id: b.id + ":" + x.n + x.half}));
      const t = c.find(x => x.n >= v) || c[c.length - 1]; if (t){ M.session = [t]; M.canvas = null; renderStage(); } };
    el(K+"GoBtn").onclick = go; el(K+"Go").onkeydown = e => { if (e.key === "Enter") go(); };
    const hold = el(K+"Hold");
    if (M.canvas && M.canvasKey === it.id && M.canvasSig === (M.full ? "F" + (M.zoom || 1) : "N")) hold.appendChild(M.canvas); else drawPage(it, hold);
  }
  function renderIntro(){
    const box = el(cfg.intro); if (!box) return;
    if (!available()){ box.hidden = true; return; }
    box.hidden = false;
    const p = P(), c = p[K+"Count"] || 0, nb = bks(p).length;
    box.innerHTML = `<div class="eyebrow">${cfg.eyebrow}</div><h2 class="cardt"><span class="ini">${cfg.ini}</span>${cfg.titleRest}</h2>
      <p class="intro">${cfg.introText}</p>
      <div class="exintrostat">${c ? `${c} ${c>1 ? cfg.statMany : cfg.statOne}` : cfg.statNone}${nb ? ` · ${nb} livro${nb>1?"s":""}` : ""}</div>
      <button type="button" class="btnp" id="${K}Start">${cfg.startLabel}</button>`;
    el(K+"Start").onclick = open;
  }
  function open(){
    M.session = []; M.done = false; M.adding = false; M.err = "";
    el("mainLayout").hidden = true; el(cfg.view).hidden = false;
    renderStage(); window.scrollTo({top:0, behavior:"instant" in window ? "instant" : "auto"});
  }
  function close(){ M.full = false; document.body.classList.remove("bkfullon"); el(cfg.view).hidden = true; el("mainLayout").hidden = false; renderAll(); }
  return {renderStage, renderIntro, open, close, dailyN, available, M};
}
