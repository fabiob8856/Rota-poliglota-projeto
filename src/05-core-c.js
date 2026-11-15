/* ---------- seu ritmo ---------- */
function renderConfig(){
  const el = document.getElementById("config"), p = P();
  el.innerHTML = `<div class="setdiv"></div><div class="flbl">Seu ritmo de estudo</div>
    <div class="field"><label for="cMin">Tempo por dia</label><div class="range"><input type="range" id="cMin" min="15" max="120" step="5" value="${p.cfg.min}"><output id="cMinO">${p.cfg.min} min</output></div></div>
    <div class="field"><label id="dLbl">Dias de estudo</label><div class="daysel" role="group" aria-labelledby="dLbl">${[1,2,3,4,5,6,0].map(d => `<button type="button" class="dayt" data-d="${d}" aria-pressed="${p.cfg.days.includes(d)}" aria-label="${DAYN[d]}">${DAYN[d]}</button>`).join("")}</div></div>
    <div class="field"><label for="cLv">Meu nível agora</label><select id="cLv">${LEVELS.map(L => `<option value="${L.id}"${L.id===p.cfg.level?" selected":""}>${L.id} · ${esc(L.name)} (${esc(L.rank)})</option>`).join("")}</select></div>
    <div class="fc" id="fc"></div>
    <label class="tktask" style="margin:10px 0"><input type="checkbox" id="cFab"${fabOn() ? " checked" : ""}> <span>Botão flutuante do baralho de revisão (criar, editar e adicionar cartões)</span></label>
    <label class="tktask" style="margin:10px 0"><input type="checkbox" id="cImm"${S.imm !== false ? " checked" : ""}> <span>Imersão: interface no idioma estudado (a partir do B1)</span></label>
    <p class="note">Não sabe seu nível? Faça um teste gratuito (link nos Recursos) e escolha aqui. Cada idioma guarda o próprio progresso neste navegador.</p>
    <div class="field"><label for="bk">Backup do progresso</label>
      <div class="row"><button class="btng" type="button" id="bkCopy">Copiar código</button><button class="btng" type="button" id="bkRestore">Restaurar do código colado</button></div>
      <textarea id="bk" style="min-height:70px;margin-top:8px" placeholder="Cole aqui um código copiado em outro aparelho e clique em Restaurar."></textarea><div class="saved" id="bkMsg"></div></div>
    <button class="reset" type="button" id="cReset">Recomeçar este idioma (apagar progresso)</button>`;
  const rg = document.getElementById("cMin");
  rg.addEventListener("input", () => { p.cfg.min = +rg.value; document.getElementById("cMinO").textContent = rg.value + " min"; updateLog(); save(); renderAll(); });
  el.querySelectorAll(".dayt").forEach(b => b.onclick = () => {
    const d = +b.dataset.d;
    if (p.cfg.days.includes(d)) { if (p.cfg.days.length > 1) p.cfg.days = p.cfg.days.filter(x=>x!==d); }
    else p.cfg.days.push(d);
    el.querySelectorAll(".dayt").forEach(x => x.setAttribute("aria-pressed", p.cfg.days.includes(+x.dataset.d)));
    save(); renderAll();
  });
  document.getElementById("cImm").onchange = e => { S.imm = e.target.checked; save(); if (window.immPass) window.immPass(); };
  document.getElementById("cFab").onchange = e => { S.fab = e.target.checked; save(); fabSync(); };
  document.getElementById("cLv").onchange = e => { const nv = e.target.value; askLevelChange(nv, () => { p.cfg.level = nv; view = p.cfg.level; pend = null; updateLog(); save(); renderAll(); }, () => { e.target.value = p.cfg.level; }); };
  const msg = t => { document.getElementById("bkMsg").textContent = t; };
  document.getElementById("bkCopy").onclick = () => {
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    const ta = document.getElementById("bk"); ta.value = code;
    const fallback = () => { ta.focus(); ta.select(); msg("Código no campo acima: selecione e copie (Ctrl+C)."); };
    try { navigator.clipboard.writeText(code).then(() => msg("Código copiado. Guarde num bloco de notas ou cole no outro aparelho."), fallback); } catch (e) { fallback(); }
  };
  document.getElementById("bkRestore").onclick = () => {
    try {
      const obj = JSON.parse(decodeURIComponent(escape(atob(document.getElementById("bk").value.trim()))));
      if (!obj || !obj.L) throw 0;
      S = obj; if (!LANG_ORDER.includes(S.lang)) S.lang = "en"; save(); view = P().cfg.level; pend = null; tmStop(); renderConfig(); renderAll(); msg("Progresso restaurado.");
    } catch (e) { msg("Esse código não é válido. Cole o código inteiro, sem espaços extras."); }
  };
  const rb = document.getElementById("cReset");
  rb.onclick = () => {
    if (!rb.classList.contains("armed")) { rb.classList.add("armed"); rb.textContent = "Clique de novo para apagar tudo deste idioma"; return; }
    S.L[S.lang] = freshLang(); view = "A1"; pend = null; tmStop(); save(); renderConfig(); renderAll();
  };
  renderForecast();
}
function renderForecast(){
  const fc = document.getElementById("fc"); if (!fc) return;
  const p = P(), wk = p.cfg.min * p.cfg.days.length / 60;
  const ai = LEVELS.findIndex(l => l.id === p.cfg.level), L = LEVELS[ai];
  const remOf = l => l.hours * (1 - doneCount(l.id)/nStep(l.id));
  const rem = remOf(L);
  const add = w => { const d = new Date(NOW); d.setDate(d.getDate() + Math.round(w*7)); return d; };
  const wL = rem / wk;
  let rows = `<div><span>Terminar o ${L.id}</span><b>${rem <= 0 ? "concluído" : `~${Math.ceil(wL)} semanas · ${monthYear(add(wL))}`}</b></div>`;
  if (ai <= 2) {
    const toB2 = rem + LEVELS.slice(ai+1, 3).reduce((a,l)=>a + remOf(l), 0);
    const w = toB2 / wk, need = toB2/52*60/p.cfg.days.length;
    rows += `<div><span>Chegar ao B2 (trabalho)</span><b>~${Math.max(1, Math.round(w/4.345))} meses · ${monthYear(add(w))}</b></div>
      <div><span>Para o B2 em 12 meses</span><b>~${Math.ceil(need/5)*5} min por dia</b></div>`;
  }
  fc.innerHTML = rows;
}

/* ---------- caderno e recursos ---------- */
let notesT;
function renderNotes(){
  const el = document.getElementById("notes"), p = P(), C = CL();
  el.innerHTML = `<div class="eyebrow">Caderno · ${esc(C.name)}</div><h2 class="cardt"><span class="ini">C</span>aderno de erros e dúvidas</h2>
    <p class="intro">Anote o que não soube dizer, palavras que esqueceu e erros que repetiu. No domingo, revise tudo.</p>
    <textarea id="notesTa" placeholder="Ex.: não soube dizer “marcar uma reunião”; confundi o passado de go…">${esc(p.notes || "")}</textarea>
    <div class="saved" id="notesMsg"></div>
    <div class="flbl" style="margin-top:14px">Como estudar melhor</div>
    <ol class="tips">${C.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ol>
    <div class="flbl" style="margin-top:16px">Conquistas · ${Object.keys(p.ach||{}).length} de ${ACH.length}</div>
    <ul class="ach">${ACH.map(a => `<li class="${p.ach && p.ach[a.id] ? "on" : ""}"><span class="ic">${a.ic}</span><div><b>${esc(a.n)}</b><span>${esc(a.d)}</span></div></li>`).join("")}</ul>`;
  const ta = document.getElementById("notesTa");
  ta.addEventListener("input", () => { p.notes = ta.value; clearTimeout(notesT); notesT = setTimeout(() => { save(); document.getElementById("notesMsg").textContent = "Salvo."; checkProgress(); }, 700); });
}
function renderRes(){
  const el = document.getElementById("res"), C = CL();
  el.innerHTML = `<div class="eyebrow">Recursos · ${esc(C.name)}</div><h2 class="cardt"><span class="ini">O</span>nde estudar</h2>
    <p class="intro">Ferramentas gratuitas (ou com versão gratuita) usadas nas etapas. Abrem numa nova aba.</p>
    <ul class="rl">${C.res.map(r => `<li><span class="rk" style="--rc:${r.c}">${esc(r.k)}</span><div><a href="${r.u}" target="_blank" rel="noopener">${esc(r.t)}</a><span>${esc(r.d)}</span></div></li>`).join("")}</ul>`;
}

function renderAll(){
  if (typeof flowSync === "function") flowSync();
  renderHead(); renderRealms(); renderToday(); renderBoardHead(); drawBoard(view); renderFlow(); renderSteps(); renderForecast(); renderNotes(); renderRes();
  if (typeof renderExIntro === "function") renderExIntro();
  if (typeof renderExStage === "function" && !document.getElementById("exView").hidden) renderExStage();
  if (typeof renderWrIntro === "function") renderWrIntro();
  if (typeof renderWrStage === "function" && !document.getElementById("wrView").hidden) renderWrStage();
  if (typeof renderTdIntro === "function") renderTdIntro();
  if (typeof renderTdStage === "function" && !document.getElementById("tdView").hidden) renderTdStage();
  if (typeof renderRevIntro === "function") renderRevIntro();
  if (typeof renderRevStage === "function" && !document.getElementById("revView").hidden) renderRevStage();
  if (pend && pend.lv === view) showPop(pend.k); else hidePop();
}
window.addEventListener("resize", () => { if (pend && pend.lv === view) showPop(pend.k); });
