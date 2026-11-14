/* ---------- revisão (baralhos de cartões, repetição espaçada com caixas de Leitner) ---------- */
const BOX_DAYS = {1:0, 2:1, 3:2, 4:4, 5:7}; // dias até reaparecer depois de acertar naquela caixa
const REV_DECKS = {
  en: [
    { id:"voc1", title:"Baralho 1 · Palavras essenciais", lvl:"A1",
      desc:"Palavras e expressões do dia a dia, para começar a memorizar.",
      cards:[
        {front:"hello", back:"olá", ex:"Hello! How are you?"},
        {front:"goodbye", back:"tchau / adeus", ex:"Goodbye, see you tomorrow!"},
        {front:"please", back:"por favor", ex:"Can you help me, please?"},
        {front:"thank you", back:"obrigado(a)", ex:"Thank you for your help!"},
        {front:"yes", back:"sim", ex:"Yes, I'd love to."},
        {front:"no", back:"não", ex:"No, thank you."},
        {front:"water", back:"água", ex:"Can I have some water, please?"},
        {front:"friend", back:"amigo(a)", ex:"She is my best friend."},
        {front:"today", back:"hoje", ex:"What are we doing today?"},
        {front:"tomorrow", back:"amanhã", ex:"See you tomorrow!"},
      ]},
  ],
};
let revSession = [];
let revFlipped = false;
let revManageId = null;
function newDeckId(){ return "cd" + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function revDecks(p){ return [...(REV_DECKS[S.lang] || []).map(d => (p.deckAdd && p.deckAdd[d.id] && p.deckAdd[d.id].length) ? {...d, cards:[...d.cards, ...p.deckAdd[d.id]]} : d), ...(p.customDecks || [])]; }
function revCardId(deck,i){ return deck.id + "_" + i; }
function revLevelDecks(p){ return revDecks(p).filter(d => !d.lvl || d.lvl === p.cfg.level); }
function revIsCustom(deck){ return deck.id.startsWith("cd"); }
function revState(p,id){ return p.rev[id] || {box:1, due:T}; }
function revDueRefs(deck,p){
  return deck.cards.map((c,i) => ({deck, card:c, id:revCardId(deck,i)})).filter(r => revState(p,r.id).due <= T);
}
function revDueCount(deck,p){ return revDueRefs(deck,p).length; }
function revDoneToday(deck,p){ return p.revSessionDone && p.revSessionDone[deck.id] === T; }
function revHeadStat(){
  const p = P(), decks = revLevelDecks(p);
  if (!decks.length) return "em breve para este idioma";
  const due = decks.reduce((a,d) => a + (revDoneToday(d,p) ? 0 : revDueCount(d,p)), 0);
  return due ? `${due} cartão${due>1?"es":""} para revisar hoje` : "nenhum cartão pendente hoje — volte amanhã";
}
function renderRevIntro(){
  const el = document.getElementById("revintro"); if (!el) return;
  el.innerHTML = `<div class="eyebrow">Memorize</div><h2 class="cardt"><span class="ini">B</span>aralho de revisão</h2>
    <p class="intro">Baralhos de cartões com repetição espaçada: você vê a frente e pode escrever a resposta (a gente confere automaticamente, sem diferenciar maiúsculas de minúsculas) ou só virar o cartão e dizer se acertou de cabeça. Quem você acerta demora mais para voltar; quem erra volta logo. Cada baralho pode ser revisado uma vez por dia.</p>
    <div class="rvintrostat">${esc(revHeadStat())}</div>
    <button type="button" class="btnp" id="revStart">Começar revisão</button>`;
  const btn = document.getElementById("revStart");
  if (btn) btn.onclick = openRevView;
}
let revStage = "choose";
let revDeleteArmedId = null;
function openRevView(){
  revStage = "choose";
  document.getElementById("mainLayout").hidden = true;
  document.getElementById("revView").hidden = false;
  renderRevStage();
  window.scrollTo({top:0, behavior:"instant" in window ? "instant" : "auto"});
}
function renderRevStage(){
  const h = document.getElementById("revHead");
  if (h) h.textContent = "";
  if (revStage === "choose") renderRevChoose();
  else if (revStage === "create") renderRevCreate();
  else if (revStage === "manage") renderRevManage();
  else renderRevStudy();
}
function renderRevChoose(){
  const body = document.getElementById("revBody"), p = P();
  const decks = revLevelDecks(p);
  const deckList = decks.length ? `<ul class="rvdecks">${decks.map(d => {
      const doneToday = revDoneToday(d,p), due = doneToday ? 0 : revDueCount(d,p), custom = revIsCustom(d);
      const canOpen = !doneToday && due > 0;
      const dueLabel = doneToday ? "Revisado hoje" : (due ? due + " para hoje" : (d.cards.length ? "em dia" : "sem cartões"));
      const delArmed = revDeleteArmedId === d.id;
      return `<li><button type="button" class="rvdeckbtn" data-d="${d.id}"${canOpen?"":" disabled"}>
        <span><b>${esc(d.title)}</b><span>${esc(d.desc || (custom ? (d.cards.length + " cartão" + (d.cards.length===1?"":"s")) : ""))}</span></span>
        <span class="rvdeckdue${canOpen?"":" zero"}">${dueLabel}</span>
      </button>${custom ? `<button type="button" class="btng rvdeckedit" data-e="${d.id}">Editar</button><button type="button" class="btng rvdeckdel${delArmed?" armed":""}" data-x="${d.id}">${delArmed?"Confirmar exclusão":"Excluir"}</button>` : ""}</li>`;
    }).join("")}</ul>` : `<p class="note">Ainda não temos baralhos prontos para o nível ${esc(p.cfg.level)}. Crie o seu próprio baralho abaixo.</p>`;
  body.innerHTML = `<div class="rvcreaterow"><button type="button" class="btng" id="revCreateBtn">+ Criar baralho</button></div>
    ${decks.length ? `<p class="note">Escolha um baralho para revisar, ou edite os seus próprios. Cada baralho pode ser revisado uma vez por dia.</p>` : ""}
    ${deckList}`;
  body.querySelectorAll(".rvdeckbtn").forEach(btn => btn.onclick = () => {
    const deck = decks.find(d => d.id === btn.dataset.d); if (deck) revOpenDeck(deck);
  });
  body.querySelectorAll(".rvdeckedit").forEach(btn => btn.onclick = () => {
    revDeleteArmedId = null; revManageId = btn.dataset.e; revStage = "manage"; renderRevStage();
  });
  body.querySelectorAll(".rvdeckdel").forEach(btn => btn.onclick = () => {
    const id = btn.dataset.x;
    if (revDeleteArmedId !== id){ revDeleteArmedId = id; renderRevChoose(); return; }
    p.customDecks = p.customDecks.filter(d => d.id !== id); save();
    revDeleteArmedId = null; renderRevChoose();
  });
  const cb = document.getElementById("revCreateBtn");
  if (cb) cb.onclick = () => { revDeleteArmedId = null; revStage = "create"; renderRevStage(); };
}
function renderRevCreate(){
  const body = document.getElementById("revBody"), p = P();
  body.innerHTML = `<p class="note">Crie seu próprio baralho de revisão e depois adicione os cartões.</p>
    <div class="field"><label for="rvNewTitle">Nome do baralho</label><input id="rvNewTitle" type="text" placeholder="Ex.: Phrasal verbs do trabalho"></div>
    <div class="field"><label for="rvNewDesc">Descrição (opcional)</label><input id="rvNewDesc" type="text" placeholder="Pra que serve esse baralho"></div>
    <div class="field"><label for="rvNewLvl">Nível</label><select id="rvNewLvl"><option value="">Todos os níveis</option>${LEVELS.map(L => `<option value="${L.id}"${L.id===p.cfg.level?" selected":""}>${L.id} · ${esc(L.name)}</option>`).join("")}</select></div>
    <div class="row"><button type="button" class="btng" id="rvCancelCreate">Cancelar</button><button type="button" class="btnp" id="rvSaveCreate">Criar baralho</button></div>`;
  document.getElementById("rvCancelCreate").onclick = () => { revStage = "choose"; renderRevStage(); };
  document.getElementById("rvSaveCreate").onclick = () => {
    const title = document.getElementById("rvNewTitle").value.trim();
    if (!title) { document.getElementById("rvNewTitle").focus(); return; }
    const desc = document.getElementById("rvNewDesc").value.trim();
    const lvl = document.getElementById("rvNewLvl").value;
    const deck = {id:newDeckId(), title, desc, lvl, cards:[]};
    p.customDecks.push(deck); save();
    revManageId = deck.id; revStage = "manage"; renderRevStage();
  };
}
function renderRevManage(){
  const body = document.getElementById("revBody"), p = P();
  const deck = (p.customDecks || []).find(d => d.id === revManageId);
  if (!deck){ revStage = "choose"; renderRevChoose(); return; }
  body.innerHTML = `<button type="button" class="btng" id="rvBackChoose">← Voltar aos baralhos</button>
    <h3 style="font-family:var(--display);font-weight:600;font-size:22px;margin:14px 0 2px">${esc(deck.title)}</h3>
    ${deck.desc ? `<p class="note" style="margin-top:0">${esc(deck.desc)}</p>` : ""}
    <ol class="rvcardlist">${deck.cards.length ? deck.cards.map((c,i) => `<li class="rvcarditem"><div><b>${esc(c.front)}</b><span>→ ${esc(c.back)}</span></div><button type="button" class="rvcardx" data-i="${i}" aria-label="Remover cartão">×</button></li>`).join("") : `<li class="note">Nenhum cartão ainda. Adicione abaixo.</li>`}</ol>
    <div class="setdiv"></div>
    <div class="flbl">Adicionar cartão</div>
    <div class="field"><label for="rvCFront">Frente (pergunta ou palavra)</label><input id="rvCFront" type="text" placeholder="Ex.: to give up"></div>
    <div class="field"><label for="rvCBack">Verso (resposta)</label><input id="rvCBack" type="text" placeholder="Ex.: desistir"></div>
    <div class="field"><label for="rvCEx">Frase de exemplo (opcional)</label><input id="rvCEx" type="text" placeholder="Ex.: Don't give up on your dreams."></div>
    <button type="button" class="btnp" id="rvAddCard" style="margin-top:14px">Adicionar cartão</button>
    <div class="setdiv"></div>
    <button class="reset" type="button" id="rvDelDeck">Excluir este baralho</button>`;
  document.getElementById("rvBackChoose").onclick = () => { revManageId = null; revStage = "choose"; renderRevStage(); };
  body.querySelectorAll(".rvcardx").forEach(btn => btn.onclick = () => {
    deck.cards.splice(+btn.dataset.i, 1); save(); renderRevManage();
  });
  document.getElementById("rvAddCard").onclick = () => {
    const fr = document.getElementById("rvCFront"), bk = document.getElementById("rvCBack"), ex = document.getElementById("rvCEx");
    const front = fr.value.trim(), back = bk.value.trim(), exv = ex.value.trim();
    if (!front || !back) { (front ? bk : fr).focus(); return; }
    deck.cards.push({front, back, ex: exv || undefined}); save(); renderRevManage();
  };
  const db = document.getElementById("rvDelDeck");
  db.onclick = () => {
    if (!db.classList.contains("armed")) { db.classList.add("armed"); db.textContent = "Clique de novo para excluir este baralho"; return; }
    p.customDecks = p.customDecks.filter(d => d.id !== deck.id); save();
    revManageId = null; revStage = "choose"; renderRevStage();
  };
}
let revCheckedOk = null;   // null = ainda não conferido por digitação nesta carta; true/false = resultado da digitação
let revTypedAnswer = "";
let revCurrentDeckId = null;
function revOpenDeck(deck){
  const p = P();
  revSession = exShuffle(revDueRefs(deck,p));
  revFlipped = false; revCheckedOk = null; revTypedAnswer = ""; revCurrentDeckId = deck.id;
  revStage = "study";
  renderRevStage();
}
function revMatch(input, back){
  if (!input || !input.trim()) return false;
  const norm = exNorm(input); // exNorm já ignora maiúsculas/minúsculas, espaços e pontuação final
  return back.split("/").some(alt => exNorm(alt) === norm);
}
function renderRevStudy(){
  const body = document.getElementById("revBody"), head = document.getElementById("revHead");
  if (!revSession.length){
    if (head) head.textContent = "";
    if (revCurrentDeckId){
      const p = P();
      if (!p.revSessionDone[revCurrentDeckId]){ p.revSessionDone[revCurrentDeckId] = T; save(); }
    }
    body.innerHTML = `<div class="rvsessiondone"><div class="rvsessiondoneic">✓</div><b>Revisão concluída!</b><p class="note">Você revisou todos os cartões pendentes deste baralho por hoje. Ele volta a ficar disponível amanhã. Voltando ao mapa…</p></div>`;
    setTimeout(closeRevView, 1600);
    return;
  }
  const r = revSession[0], typedMode = revFlipped && revCheckedOk !== null;
  if (head) head.textContent = `Faltam ${revSession.length} cartão${revSession.length>1?"s":""} nesta sessão`;
  const frontInner = !revFlipped ? `
      <div class="rvanswerrow"><input type="text" id="rvAnswerInput" class="rvanswerinput" autocomplete="off" spellcheck="false" autocapitalize="off" placeholder="Escreva a resposta..."><button type="button" class="btnp rvcheckbtn" id="rvCheckBtn">Conferir</button></div>
      <button type="button" class="btng rvflipbtn" id="rvFlipBtn">Só virar (sem escrever)</button>
      <p class="rvhint">Escreva a resposta e clique em Conferir, ou clique em "Só virar" para conferir de cabeça.</p>` : "";
  body.innerHTML = `<p class="rvsessioninfo">${esc(r.deck.title)}</p>
    <div class="rvcardwrap"><div class="rvcard${revFlipped?" flipped":""}">
      <div class="rvface rvfront"><div class="rvtag">Frente</div><div class="rvtext">${esc(r.card.front)}</div>${frontInner}</div>
      <div class="rvface rvback"><div class="rvtag">Verso</div><div class="rvtext">${esc(r.card.back)}</div>${r.card.ex ? `<div class="rvex">“${esc(r.card.ex)}”</div>` : ""}
        ${typedMode ? `<div class="rvtypedfb ${revCheckedOk?"ok":"bad"}">${revCheckedOk ? `Certo! Você escreveu "${esc(revTypedAnswer)}".` : `Você escreveu "${esc(revTypedAnswer)}" — a resposta esperada era: ${esc(r.card.back)}`}</div>` : ""}
      </div>
    </div></div>
    <div class="rvactions" id="rvActions">${typedMode ? `
      <button type="button" class="btnp rvbtn" id="rvNext">Próximo cartão</button>` : revFlipped ? `
      <button type="button" class="btnp rvbtn rvwrong" id="rvWrong">Errei</button>
      <button type="button" class="btnp rvbtn rvright" id="rvRight">Acertei</button>` : ""}`;
  const inp = document.getElementById("rvAnswerInput"), chk = document.getElementById("rvCheckBtn"), fb = document.getElementById("rvFlipBtn");
  if (inp) { inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); revCheckAnswer(); } }); inp.focus(); }
  if (chk) chk.onclick = () => revCheckAnswer();
  if (fb) fb.onclick = () => { revFlipped = true; renderRevStudy(); };
  const bw = document.getElementById("rvWrong"), br = document.getElementById("rvRight"), nx = document.getElementById("rvNext");
  if (bw) bw.onclick = () => { revApplyGrade(false); revAdvance(); };
  if (br) br.onclick = () => { revApplyGrade(true); revAdvance(); };
  if (nx) nx.onclick = () => revAdvance();
}
function revCheckAnswer(){
  const r = revSession[0]; if (!r) return;
  const inp = document.getElementById("rvAnswerInput"); if (!inp) return;
  const val = inp.value;
  if (!val.trim()){ inp.focus(); return; }
  const ok = revMatch(val, r.card.back);
  revTypedAnswer = val; revCheckedOk = ok; revFlipped = true;
  revApplyGrade(ok);
  renderRevStudy();
}
function revApplyGrade(ok){
  const r = revSession[0]; if (!r) return;
  const p = P();
  let box = revState(p,r.id).box;
  if (ok) box = Math.min(5, box+1);
  else box = 1;
  p.rev[r.id] = {box, due: addDays(T, BOX_DAYS[box])};
  const ml = mlogToday(), mid = "rv_" + r.deck.id;
  if (!ml.includes(mid)) ml.push(mid); // bônus de missão do dia: só a primeira vez que esse baralho é revisado hoje
  updateLog(); save(); checkProgress();
}
function revAdvance(){
  revSession.shift(); revFlipped = false; revCheckedOk = null; revTypedAnswer = "";
  renderRevStudy();
}
function closeRevView(){
  revSession = []; revFlipped = false; revCheckedOk = null; revTypedAnswer = ""; revCurrentDeckId = null; revStage = "choose";
  document.getElementById("revView").hidden = true;
  document.getElementById("mainLayout").hidden = false;
  renderAll();
}

/* ---------- botão flutuante do Baralho de revisão (criar, editar, adicionar cartão, excluir) ---------- */
const fabOn = () => S.fab !== false;
function fabInit(){
  if (document.getElementById("fabBtn")) return;
  const b = document.createElement("button"); b.type = "button"; b.id = "fabBtn"; b.className = "fabbtn"; b.setAttribute("aria-label", "Baralho de revisão: criar, editar ou adicionar cartões"); b.title = "Baralho de revisão";
  b.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="6" y="3" width="13" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" transform="rotate(8 12 11)"/><rect x="4" y="5" width="13" height="16" rx="2" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 10v6M7.5 13h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  b.onclick = () => fabOpen("list");
  document.body.appendChild(b);
  const o = document.createElement("div"); o.className = "overlay"; o.id = "fabOverlay"; o.hidden = true; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", "Baralho de revisão");
  o.innerHTML = '<div class="modalcard set"><button class="modalx" type="button" id="fabClose" aria-label="Fechar">×</button><div id="fabBody"></div></div>';
  document.body.appendChild(o);
  document.getElementById("fabClose").onclick = fabClose;
  o.addEventListener("mousedown", e => { if (e.target === o) fabClose(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !o.hidden) fabClose(); });
  fabSync();
}
function fabSync(){ const b = document.getElementById("fabBtn"); if (b) b.hidden = !fabOn(); }
function fabClose(){ document.getElementById("fabOverlay").hidden = true; renderAll(); }
let fabDelArm = null;
function fabOpen(mode, id){
  const o = document.getElementById("fabOverlay"), body = document.getElementById("fabBody"), p = P(); o.hidden = false;
  const deck = id ? revDecks(p).find(d => d.id === id) : null;
  const back = `<button type="button" class="btng" id="fbBack">← Voltar</button>`;
  const field = (i, l, ph, v) => `<div class="field"><label for="${i}">${l}</label><input id="${i}" type="text" placeholder="${ph}"${v ? ` value="${esc(v)}"` : ""}></div>`;
  const wireBack = () => { const e = document.getElementById("fbBack"); if (e) e.onclick = () => { fabDelArm = null; fabOpen("list"); }; };
  if (mode === "list"){
    const decks = revLevelDecks(p);
    body.innerHTML = `<div class="eyebrow">Baralho de revisão</div><h2 class="cardt"><span class="ini">B</span>aralhos</h2>
      <button type="button" class="btnp" id="fbNew" style="margin-bottom:12px">+ Criar baralho</button>
      ${decks.length ? `<ul class="fbdecks">${decks.map(d => { const c = revIsCustom(d), arm = fabDelArm === d.id;
        return `<li><div class="fbt"><b>${esc(d.title)}</b><small>${d.cards.length} cartõe${d.cards.length === 1 ? "" : "s"}${c ? " · seu baralho" : ""}</small></div>
          <div class="fbact"><button type="button" class="btng" data-a="add" data-d="${d.id}">+ Cartão</button>${c ? `<button type="button" class="btng" data-a="edit" data-d="${d.id}">Editar</button><button type="button" class="btng${arm ? " armed" : ""}" data-a="del" data-d="${d.id}">${arm ? "Confirmar exclusão" : "Excluir"}</button>` : ""}</div></li>`; }).join("")}</ul>` : `<p class="note">Nenhum baralho neste nível ainda. Crie o seu.</p>`}
      <p class="note">Baralhos prontos aceitam novos cartões; editar e excluir valem para os baralhos que você criou.</p>`;
    document.getElementById("fbNew").onclick = () => fabOpen("create");
    body.querySelectorAll("[data-a]").forEach(btn => btn.onclick = () => {
      const a = btn.dataset.a, d = btn.dataset.d;
      if (a === "add") fabOpen("add", d); else if (a === "edit") fabOpen("edit", d);
      else { if (fabDelArm !== d){ fabDelArm = d; fabOpen("list"); return; } p.customDecks = (p.customDecks || []).filter(x => x.id !== d); save(); fabDelArm = null; fabOpen("list"); }
    });
  } else if (mode === "create"){
    body.innerHTML = `${back}<h3 class="fbh">Criar baralho</h3>${field("fbTitle","Nome do baralho","Ex.: Phrasal verbs do trabalho")}${field("fbDesc","Descrição (opcional)","Pra que serve esse baralho")}
      <div class="field"><label for="fbLvl">Nível</label><select id="fbLvl"><option value="">Todos os níveis</option>${LEVELS.map(L => `<option value="${L.id}"${L.id === p.cfg.level ? " selected" : ""}>${L.id} · ${esc(L.name)}</option>`).join("")}</select></div>
      <button type="button" class="btnp" id="fbSave">Criar e adicionar cartões</button>`;
    wireBack();
    document.getElementById("fbSave").onclick = () => { const t = document.getElementById("fbTitle").value.trim(); if (!t){ document.getElementById("fbTitle").focus(); return; }
      const d = {id:newDeckId(), title:t, desc:document.getElementById("fbDesc").value.trim(), lvl:document.getElementById("fbLvl").value, cards:[]};
      if (!p.customDecks) p.customDecks = []; p.customDecks.push(d); save(); fabOpen("add", d.id); };
  } else if (deck && (mode === "add" || mode === "edit")){
    const custom = revIsCustom(deck);
    body.innerHTML = `${back}<h3 class="fbh">${esc(deck.title)}</h3>
      ${mode === "edit" && custom ? field("fbTitle","Nome do baralho","",deck.title) + field("fbDesc","Descrição","",deck.desc || "") + `<button type="button" class="btng" id="fbRen">Salvar nome</button><div class="setdiv"></div>` : ""}
      ${mode === "edit" ? `<ol class="rvcardlist">${deck.cards.length ? deck.cards.map((c,i) => `<li class="rvcarditem"><div><b>${esc(c.front)}</b><span>→ ${esc(c.back)}</span></div>${custom ? `<button type="button" class="rvcardx" data-i="${i}" aria-label="Remover cartão">×</button>` : ""}</li>`).join("") : `<li class="note">Nenhum cartão ainda.</li>`}</ol><div class="setdiv"></div>` : `<p class="note">${deck.cards.length} cartõe${deck.cards.length === 1 ? "" : "s"} no baralho.</p>`}
      <div class="flbl">Adicionar cartão</div>${field("fbF","Frente (pergunta ou palavra)","Ex.: to give up")}${field("fbB","Verso (resposta)","Ex.: desistir")}${field("fbE","Frase de exemplo (opcional)","Ex.: Don't give up on your dreams.")}
      <div class="saved" id="fbMsg"></div><button type="button" class="btnp" id="fbAdd" style="margin-top:10px">Adicionar cartão</button>`;
    wireBack();
    const ren = document.getElementById("fbRen"); if (ren) ren.onclick = () => { const t = document.getElementById("fbTitle").value.trim(); if (!t) return; const d = p.customDecks.find(x => x.id === deck.id); d.title = t; d.desc = document.getElementById("fbDesc").value.trim(); save(); fabOpen("edit", deck.id); };
    body.querySelectorAll(".rvcardx").forEach(btn => btn.onclick = () => { const d = p.customDecks.find(x => x.id === deck.id); d.cards.splice(+btn.dataset.i, 1); save(); fabOpen("edit", deck.id); });
    document.getElementById("fbAdd").onclick = () => {
      const fr = document.getElementById("fbF"), bk = document.getElementById("fbB"), f = fr.value.trim(), b = bk.value.trim(), e = document.getElementById("fbE").value.trim();
      if (!f || !b){ (f ? bk : fr).focus(); return; }
      const card = {front:f, back:b, ex:e || undefined};
      if (custom) p.customDecks.find(x => x.id === deck.id).cards.push(card); else { if (!p.deckAdd) p.deckAdd = {}; if (!p.deckAdd[deck.id]) p.deckAdd[deck.id] = []; p.deckAdd[deck.id].push(card); }
      save(); fabOpen(mode, deck.id); const m = document.getElementById("fbMsg"); if (m) m.textContent = "Cartão adicionado."; const ff = document.getElementById("fbF"); if (ff) ff.focus();
    };
  } else fabOpen("list");
}
fabInit();
