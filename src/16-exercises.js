/* ---------- exercícios (baseado na estrutura de livros, com frases originais) ---------- */
const EX_BOOKS = {
  en: {
    title: "Gramática essencial",
    src: "Organizado seguindo a ordem de temas do livro Essential Grammar in Use (R. Murphy, Cambridge) — explicações e frases escritas por nós, não copiadas do livro.",
    vsrc: "Vocabulário organizado por temas (nos níveis A1 e A2, seguindo a ordem de temas do livro English Vocabulary in Use Elementary) — palavras, traduções e frases escritas por nós, não copiadas do livro.",
    vunits: [],
    units: [
      { id:"gu1", title:"Unidade 1 · am / is / are", lead:"O verbo \"to be\" no presente.", lvl:"A1",
        expl:"Use <b>am</b> com I, <b>is</b> com he/she/it, e <b>are</b> com we/you/they. Negativa: am not, isn't, aren't. Formas curtas: I'm, he's, we're, isn't, aren't.",
        vid:"verb to be am is are explicação em português",
        items:[
          {t:"choice", q:"I ___ from Brazil.", opts:["am","is","are"], a:0},
          {t:"choice", q:"She ___ a teacher.", opts:["am","is","are"], a:1},
          {t:"choice", q:"They ___ at home today.", opts:["am","is","are"], a:2},
          {t:"text", q:"Complete com a forma curta: He ___ (not) ready. (he + is not)", a:["he isn't","he's not"], hint:"duas opções são aceitas"},
        ]},
      { id:"gu2", title:"Unidade 2 · am / is / are (perguntas)", lead:"Como transformar em pergunta.", lvl:"A1",
        expl:"Inverta a ordem: <b>Is</b> she a student? <b>Are</b> you ready? Use palavras como What, Where, Who, How antes do verbo: <b>Where are</b> you from?",
        vid:"perguntas com to be em inglês explicação",
        items:[
          {t:"choice", q:"___ you hungry?", opts:["Am","Is","Are"], a:2},
          {t:"choice", q:"___ your brother a student?", opts:["Is","Are","Am"], a:0},
          {t:"text", q:"Escreva a pergunta: (you / from Brazil)", a:["are you from brazil","are you from brazil?"]},
          {t:"text", q:"Complete: ___ is your favourite colour? (pergunta sobre 'o quê')", a:["what"]},
        ]},
      { id:"gu3", title:"Unidade 3 · presente contínuo (I am doing)", lead:"Ações acontecendo agora.", lvl:"A1",
        expl:"Forma: am/is/are + verbo-ing. Usamos para algo acontecendo neste momento: <b>I'm writing</b> an email. <b>She's reading</b> a book. Negativa: <b>I'm not watching</b> TV.",
        vid:"present continuous presente contínuo inglês explicação",
        items:[
          {t:"choice", q:"Look! It ___ raining.", opts:["is","am","are"], a:0},
          {t:"text", q:"Complete com -ing: She is ___ (write) a message.", a:["writing"]},
          {t:"text", q:"Complete com -ing: They are ___ (run) in the park.", a:["running"]},
          {t:"choice", q:"We ___ not watching TV right now.", opts:["is","are","am"], a:1},
        ]},
    ]},
};
let exSubj = "gram";
let exSession = [];
let exAns = {};
let exStepMode = null; // quando a tela de uma etapa do fluxograma usa o motor: {onUnit(u)}
let exGraded = {}; // concluídas NESTA sessão aberta (nunca persiste — reabrir é sempre em branco)
function exBook(){ return EX_BOOKS[S.lang] || null; }
function exItemId(u,i){ return u + "_" + i; }
function exLevelUnits(book, p, subj){ // subj: "gram" | "vocab" | (outro) = gramática + vocabulário
  const pool = subj === "gram" ? book.units : subj === "vocab" ? (book.vunits || []) : book.units.concat(book.vunits || []);
  return pool.filter(u => !u.lvl || u.lvl === p.cfg.level);
}
function exShuffle(arr){
  const a = arr.slice();
  for (let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); const t = a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
/* Barra de progresso dos níveis: cada DIA em que você conclui ao menos uma sessão completa de exercícios conta 1 dia.
   Meta por nível = horas recomendadas do nível (as mesmas da previsão em Configurações) ÷ minutos de estudo por dia
   que você definiu, arredondada para cima de 5 em 5. Com 45 min/dia: A1 120, A2 150, B1 240, B2 270, C1 320, C2 400 dias.
   Estudar mais minutos por dia reduz a meta. Dias não precisam ser seguidos. */
function exDaysTarget(lvl, p){
  const L = LEVELS.find(l => l.id === lvl);
  const mul = ({ru:1.3, ar:1.5})[S.lang] || 1; // alfabeto diferente: mais dias
  return Math.ceil(L.hours * mul * 60 / Math.max(10, p.cfg.min) / 5) * 5;
}
function exDaysCount(p,lvl){ return (p.exDays && p.exDays[lvl] ? p.exDays[lvl].length : 0); }
function exMarkDay(p){
  const lvl = p.cfg.level; if (!p.exDays) p.exDays = {};
  if (!p.exDays[lvl]) p.exDays[lvl] = [];
  if (!p.exDays[lvl].includes(T)) p.exDays[lvl].push(T);
}
const EX_INTERVALS = [3,7,14,30]; // dias até a unidade voltar: 1ª vez 3, depois 7, 14, 30
function exIsDue(p,id){ const s = p.exSched && p.exSched[id]; return !!s && s.due <= T; }
function exDueUnits(units,p){
  return units.filter(u => exIsDue(p,u.id)).sort((a,b) => p.exSched[a.id].due.localeCompare(p.exSched[b.id].due));
}
function exPickSession(units){
  // 1º: unidades que já venceram o prazo de revisão; 2º: unidades nunca feitas; 3º: o resto, aleatório
  const p = P(), due = exDueUnits(units,p), dueIds = new Set(due.map(u => u.id));
  const fresh = exShuffle(units.filter(u => !dueIds.has(u.id) && !(p.exSched && p.exSched[u.id])));
  const later = exShuffle(units.filter(u => !dueIds.has(u.id) && p.exSched && p.exSched[u.id]));
  return exShuffle(due.slice(0,4).concat(fresh, later).slice(0,4));
}
function renderExercises(){
  const el = document.getElementById("exBody"); if (!el) return;
  const book = exBook();
  if (!book){ el.innerHTML = `<p class="note">Ainda não tem exercícios importados para este idioma.</p>`; return; }
  if (exSubj === "vocab" && !(book.vunits || []).length){ el.innerHTML = `<p class="note">Ainda não temos exercícios de vocabulário para este idioma.</p>`; return; }
  const srcTxt = exSubj === "vocab" ? book.vsrc : exSubj === "gram" ? book.src : book.src + " " + (book.vsrc || "");
  const p = P(); if (!p.exlog) p.exlog = {};
  const lvl = p.cfg.level;
  const units = exLevelUnits(book, p, exSubj);
  if (!units.length){
    el.innerHTML = `<p class="note">${esc(book.src)}</p><p class="note">Ainda não temos exercícios desta matéria para o nível ${esc(lvl)} — vamos adicionando conforme avançamos no livro. Troque seu nível em Configurações para ver os exercícios de outro nível.</p>`;
    return;
  }
  if (!exSession.length) exSession = exPickSession(units);
  el.innerHTML = `<p class="note">${esc(srcTxt)}</p>
    <p class="exsessioninfo">Esta sessão tem ${exSession.length} unidade${exSession.length>1?"s":""}: primeiro as que estão na hora de rever (3, 7, 14 e 30 dias depois de concluir), depois as novas. Responda tudo em cada uma e clique em Concluir para conferir — ao terminar todas, você volta ao mapa.</p>` +
    exSession.map((u,ui) => {
      const total = u.items.length, done = !!exGraded[u.id];
      const dueBadge = (!done && exIsDue(p,u.id)) ? `<span class="exdue">↻ revisão</span>` : "";
      return `<div class="exunit" data-u="${u.id}">
        <div class="exunithead"><b>${esc(u.title)}</b>${dueBadge}<span class="exprog">${done ? "✓" : "0/"+total}</span></div>
        <p class="exlead">${esc(u.lead)}</p>
        <div class="exexpl">${u.expl}</div>
        ${u.vid ? `<a class="exvid" href="https://www.youtube.com/results?search_query=${encodeURIComponent(u.vid)}" target="_blank" rel="noopener">▶ Ver vídeo explicando esse tema</a>` : ""}
        <ol class="exlist">${u.items.map((it,i) => exItemHtml(u,it,i,p,done)).join("")}</ol>
        <div class="exdonearea" data-u="${u.id}"></div>
      </div>`;
    }).join("");
  exSession.forEach(u => { u.items.forEach((it,i) => wireExItem(u,it,i)); renderDoneArea(u); });
}
function exItemHtml(u,it,i,p,unitDone){
  const id = exItemId(u.id,i), st = p.exlog[id], graded = !!unitDone && !!st;
  const cls = graded ? (st.ok ? "ok" : "bad") : "";
  if (it.t === "choice"){
    const opts = it.opts.map((o,oi) => {
      let extra = "";
      if (graded){ if (oi === it.a) extra = " correct"; else if (!st.ok && exAns[id] === oi) extra = " wrong"; }
      return `<button type="button" class="exopt${extra}" data-oi="${oi}"${graded?" disabled":""}>${esc(o)}</button>`;
    }).join("");
    const fb = graded ? (st.ok ? "Certo!" : `Resposta certa: ${esc(it.opts[it.a])}`) : "";
    return `<li class="exit ${cls}" data-id="${id}"><div class="exq">${esc(it.q)}</div>${exSayBtn(it)}
      <div class="exopts">${opts}</div>
      <div class="exfb ${cls}">${fb}</div></li>`;
  }
  if (it.t === "find"){
    const words = it.words.map((w,wi) => {
      let extra = "";
      if (graded){ if (wi === it.a) extra = " correct"; else if (!st.ok && exAns[id] === wi) extra = " wrong"; }
      return `<button type="button" class="exopt exw${extra}" data-oi="${wi}"${graded?" disabled":""}>${esc(w)}</button>`;
    }).join(" ");
    const fb = graded ? (st.ok ? "Certo!" : `O erro estava em "${esc(it.words[it.a])}" → ${esc(it.fix)}`) : "";
    return `<li class="exit ${cls}" data-id="${id}"><div class="exq">${esc(it.q || "Toque na palavra que está errada.")}</div>
      <div class="exopts exwords"${S.lang === "ar" ? ' dir="rtl"' : ""}>${words}</div>
      <div class="exfb ${cls}">${fb}</div></li>`;
  }
  if (it.t === "order"){
    const cur = exAns[id] || [], rtl = S.lang === "ar" ? ' dir="rtl"' : "";
    const built = cur.map(wi => `<button type="button" class="exopt exw exbuiltw" data-wi="${wi}"${graded?" disabled":""}>${esc(it.words[wi])}</button>`).join(" ");
    const tiles = it.perm.map(wi => `<button type="button" class="exopt exw exwtile" data-wi="${wi}"${graded||cur.includes(wi)?" disabled":""}>${esc(it.words[wi])}</button>`).join(" ");
    const fb = graded ? (st.ok ? "Certo!" : `Frase certa: ${esc(it.words.join(" "))}`) : "";
    return `<li class="exit ${cls}" data-id="${id}"><div class="exq">${esc(it.q)}</div>
      <div class="exbuilt"${rtl}>${built || '<span class="exbuilthint">Toque nas palavras na ordem certa…</span>'}</div>
      <div class="exopts exwords"${rtl}>${tiles}</div>
      <div class="exfb ${cls}">${fb}</div></li>`;
  }
  const fb = graded ? (st.ok ? "Certo!" : `Resposta certa: ${esc(it.a[0])}`) : "";
  return `<li class="exit ${cls}" data-id="${id}"><div class="exq">${esc(it.q)}</div>${exSayBtn(it)}
    <div class="exrow"><input type="text" class="exinput" autocomplete="off" spellcheck="false" placeholder="Escreva aqui..."${graded?" disabled":""}></div>
    ${it.hint ? `<div class="exhint">${esc(it.hint)}</div>` : ""}
    <div class="exfb ${cls}">${fb}</div></li>`;
}
function exSayBtn(it){ return it.say ? `<span class="exsayrow"><button type="button" class="exsay" data-say="${esc(it.say)}" aria-label="Ouvir em inglês">🔊 Ouvir</button></span>` : ""; }
function exVoices(){ try { return speechSynthesis.getVoices().filter(v => /^en([-_]|$)/i.test(v.lang)); } catch (x) { return []; } }
function exVoiceScore(v){ const n = v.name; let sc = 0;
  if (/natural|neural|premium|enhanced/i.test(n)) sc += 100;
  if (/online/i.test(n)) sc += 20;
  if (/google/i.test(n)) sc += 60;
  if (/samantha|ava|allison|aria|jenny|guy|zira|susan|karen|daniel|serena|siri/i.test(n)) sc += 40;
  if (/^en[-_]US/i.test(v.lang)) sc += 10;
  if (/espeak|compact|novelty|bad news|bahh|bells|boing|cellos|good news|jester|organ|superstar|trinoids|whisper|zarvox|albert|fred|junior|kathy|ralph|bubbles/i.test(n)) sc -= 200;
  if (!v.localService) sc += 5; return sc; }
function exPickVoice(){ const vs = exVoices().sort((a,b) => exVoiceScore(b) - exVoiceScore(a)); if (!vs.length) return null;
  let saved = ""; try { saved = localStorage.getItem("rp-voice") || ""; } catch (x) {}
  return vs.find(v => v.name === saved) || vs[0]; }
const EX_LET = {a:"ay",b:"bee",c:"see",d:"dee",e:"ee",f:"eff",g:"gee",h:"aitch",i:"eye",j:"jay",k:"kay",l:"el",m:"em",n:"en",o:"oh",p:"pea",q:"cue",r:"are",s:"ess",t:"tea",u:"you",v:"vee",w:"double you",x:"ex",y:"why",z:"zee"};
function exSayText(t){ const x = String(t).trim(); if (/^[A-Za-z](\s[A-Za-z])*$/.test(x)) return x.split(" ").map(c => EX_LET[c.toLowerCase()]).join(", "); return x; }
let exAud = null;
function exSpeak(text, cb){
  const key = exSayText(text);
  if (typeof EX_AUDIO !== "undefined" && EX_AUDIO[key]) { try { if (exAud) exAud.pause(); exAud = new Audio(EX_AUDIO[key]); exAud.play().then(() => cb && cb(true)).catch(() => exSpeakTTS(text, cb)); return; } catch (x) {} }
  exSpeakTTS(text, cb); }
function exSpeakTTS(text, cb){ try {
  const go = () => { const v = exPickVoice(); if (!v) { cb && cb(false); return; }
    const u = new SpeechSynthesisUtterance(exSayText(text)); u.voice = v; u.lang = v.lang; u.rate = .8; u.pitch = 1;
    speechSynthesis.cancel(); speechSynthesis.speak(u); cb && cb(true); };
  if (exVoices().length) go(); else { let done = false; const fin = () => { if (done) return; done = true; go(); };
    speechSynthesis.onvoiceschanged = fin; setTimeout(fin, 1200); speechSynthesis.getVoices(); }
  } catch (x) { cb && cb(false); } }
try { speechSynthesis.getVoices(); } catch (x) {}
document.addEventListener("click", e => { const b = e.target.closest && e.target.closest(".exsay"); if (!b) return;
  exSpeak(b.dataset.say, ok => { if (!ok) b.textContent = "Sem voz em inglês neste navegador"; }); });
function exNorm(s){
  let x = String(s).toLowerCase().trim().replace(/^[¿¡]+/,"").replace(/[.!?؟]+$/,"").replace(/\s+/g," ");
  if (["es","fr","tr"].includes(S.lang)) x = x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ı/g,"i").replace(/ß/g,"ss");
  if (S.lang === "ar") x = x.replace(/[\u064B-\u0652\u0640]/g,"");
  return x;
}
function exAllAnswered(u){
  return u.items.every((it,i) => {
    const id = exItemId(u.id,i);
    if (it.t === "choice" || it.t === "find") return exAns[id] !== undefined;
    if (it.t === "order") return (exAns[id] || []).length === it.words.length;
    const li = document.querySelector(`.exit[data-id="${id}"]`), inp = li && li.querySelector(".exinput");
    return inp && inp.value.trim() !== "";
  });
}
function renderDoneArea(u){
  const el = document.querySelector(`.exdonearea[data-u="${u.id}"]`); if (!el) return;
  if (exGraded[u.id]){
    el.innerHTML = `<div class="excompleted">✓ Unidade concluída · contou nas missões de hoje</div>`;
    return;
  }
  const ready = exAllAnswered(u);
  el.innerHTML = `<button type="button" class="btnp exfinish" id="exFinish_${u.id}"${ready?"":" disabled"}>Concluir</button>
    ${ready ? "" : `<p class="exremain">Responda todas as perguntas desta unidade para poder concluir.</p>`}`;
  const btn = document.getElementById("exFinish_" + u.id);
  if (btn) btn.onclick = () => finishUnit(u);
}
function finishUnit(u){
  const p = P();
  if (!exAllAnswered(u)) return;
  let allOk = true;
  u.items.forEach((it,i) => {
    const id = exItemId(u.id,i);
    const li = document.querySelector(`.exit[data-id="${id}"]`); if (!li) return;
    let ok;
    if (it.t === "find"){
      ok = exAns[id] === it.a;
      li.querySelectorAll(".exopt").forEach(b => { const oi = +b.dataset.oi; b.disabled = true; b.classList.remove("sel"); if (oi === it.a) b.classList.add("correct"); else if (oi === exAns[id]) b.classList.add("wrong"); });
    } else if (it.t === "order"){
      ok = (exAns[id] || []).map(wi => it.words[wi]).join(" ") === it.words.join(" ");
      li.querySelectorAll(".exopt").forEach(b => { b.disabled = true; });
    } else if (it.t === "choice"){
      ok = exAns[id] === it.a;
      li.querySelectorAll(".exopt").forEach(b => {
        const oi = +b.dataset.oi;
        b.disabled = true; b.classList.remove("sel");
        if (oi === it.a) b.classList.add("correct");
        else if (oi === exAns[id]) b.classList.add("wrong");
      });
    } else {
      const inp = li.querySelector(".exinput");
      ok = it.a.some(a => exNorm(a) === exNorm(inp.value));
      inp.disabled = true;
    }
    if (!ok) allOk = false;
    p.exlog[id] = {ok, t:T};
    li.classList.remove("ok","bad"); li.classList.add(ok?"ok":"bad");
    const fb = li.querySelector(".exfb");
    fb.textContent = ok ? "Certo!" : (it.t === "order" ? `Frase certa: ${it.words.join(" ")}` : it.t === "find" ? `O erro estava em "${it.words[it.a]}" → ${it.fix}` : `Resposta certa: ${it.t==="choice"?it.opts[it.a]:it.a[0]}`);
    fb.className = "exfb " + (ok?"ok":"bad");
  });
  if (!exStepMode){
  if (!p.exDone) p.exDone = {};
  p.exDone[u.id] = T; // só para a estatística "unidades já concluídas alguma vez" — não bloqueia repetir
  // repetição espaçada: tudo certo → intervalo maior; errou algo → volta ao primeiro intervalo
  if (!p.exSched) p.exSched = {};
  const prev = p.exSched[u.id], step = allOk ? Math.min((prev ? prev.step : -1) + 1, EX_INTERVALS.length - 1) : 0;
  p.exSched[u.id] = {step, due: addDays(T, EX_INTERVALS[step])};
  }
  exGraded[u.id] = true; // concluída NESTA sessão aberta
  if (!exStepMode){ const ml = mlogToday(), mid = "ex_" + u.id;
    if (!ml.includes(mid)) ml.push(mid); } // bônus de missão do dia: só a primeira vez que essa unidade é concluída hoje
  updateLog(); save(); checkProgress();
  const h = document.getElementById("exHead"); if (h && !exStepMode) h.textContent = exHeadText();
  const summary = document.querySelector(`.exunit[data-u="${u.id}"] .exprog`); if (summary) summary.textContent = "✓";
  renderDoneArea(u);
  if (exStepMode) exStepMode.onUnit(u); else checkExSessionDone();
}
function checkExSessionDone(){
  if (exSession.length && exSession.every(u => exGraded[u.id])){
    const body = document.getElementById("exBody"), bar = document.getElementById("exSubjBar");
    if (bar) bar.innerHTML = "";
    const p = P();
    p.exDaily = {date:T, n: exDailyN(p) + 1}; exMarkDay(p); save(); renderRealms();
    if (body) body.innerHTML = `<div class="exsessiondone"><div class="exsessiondoneic">✓</div><b>Exercícios concluídos!</b><p class="note">Você terminou esta sessão e a missão "Exercícios do dia" foi marcada. Quer treinar mais?</p>
      <div class="exchoice"><button type="button" class="btnp exchoicebtn" id="exMore">Fazer mais exercícios</button><button type="button" class="btng exchoicebtn" id="exToMap">Voltar ao mapa</button></div></div>`;
    exSession = []; exAns = {}; exGraded = {};
    const mb = document.getElementById("exMore"), tb = document.getElementById("exToMap");
    if (mb) mb.onclick = () => openExSubject("gram");
    if (tb) tb.onclick = closeExView;
  }
}
function wireExItem(u,it,i){
  const id = exItemId(u.id,i);
  const li = document.querySelector(`.exit[data-id="${id}"]`); if (!li) return;
  if (exGraded[u.id]) return; // unidade já concluída nesta sessão: nada a conectar
  if (it.t === "choice" || it.t === "find"){
    li.querySelectorAll(".exopt").forEach(btn => btn.onclick = () => {
      li.querySelectorAll(".exopt").forEach(b=>b.classList.remove("sel"));
      btn.classList.add("sel");
      exAns[id] = +btn.dataset.oi;
      renderDoneArea(u);
    });
  } else if (it.t === "order"){
    const redraw = () => { const nl = document.createElement("div"); nl.innerHTML = exItemHtml(u, it, i, P(), false); const fresh = nl.firstElementChild; li.innerHTML = fresh.innerHTML; bind(); renderDoneArea(u); };
    const bind = () => {
      li.querySelectorAll(".exwtile").forEach(b => b.onclick = () => { (exAns[id] = exAns[id] || []).push(+b.dataset.wi); redraw(); });
      li.querySelectorAll(".exbuiltw").forEach(b => b.onclick = () => { exAns[id] = (exAns[id] || []).filter(x => x !== +b.dataset.wi); redraw(); });
    };
    bind();
  } else {
    const inp = li.querySelector(".exinput");
    if (inp) inp.addEventListener("input", () => renderDoneArea(u));
  }
}
function exHeadText(){
  const book = exBook(); if (!book) return "";
  const p = P(); if (!p.exDone) p.exDone = {};
  const units = exLevelUnits(book, p);
  const done = units.filter(u => p.exDone[u.id]).length;
  const due = exDueUnits(units,p).length;
  return `${done} de ${units.length} unidade${units.length>1?"s":""} concluída${done===1?"":"s"}` + (due ? ` · ${due} para rever hoje` : "");
}
let exStage = "choose";
function renderExIntro(){
  const el = document.getElementById("exintro"); if (!el) return;
  const book = exBook(), p0 = P();
  const stat = book ? exHeadText() : "em breve para este idioma";
  el.innerHTML = `<div class="eyebrow">Pratique</div><h2 class="cardt"><span class="ini">E</span>xercícios</h2>
    <p class="intro">Exercícios de gramática e vocabulário baseados nos seus livros, organizados por matéria. Marque a opção certa ou escreva a resposta, clique em Concluir e a gente confere tudo de uma vez. A barrinha embaixo de cada nível enche com os dias em que você conclui ao menos uma sessão completa (a meta de cada nível depende dos minutos por dia que você definiu: com ${p0.cfg.min} min, são ${LEVELS.map(l => l.id + " " + exDaysTarget(l.id, p0)).join(", ")} dias — não precisam ser seguidos).</p>
    <div class="exintrostat">${esc(stat)}</div>
    <button type="button" class="btnp" id="exStart">Começar exercícios</button>`;
  const btn = document.getElementById("exStart");
  if (btn) btn.onclick = openExView;
}
function openExView(){
  exStage = "choose";
  document.getElementById("mainLayout").hidden = true;
  document.getElementById("exView").hidden = false;
  renderExStage();
  window.scrollTo({top:0, behavior:"instant" in window ? "instant" : "auto"});
}
function renderExStage(){
  const bar = document.getElementById("exSubjBar"), body = document.getElementById("exBody");
  const h = document.getElementById("exHead");
  if (exStage === "choose"){
    bar.innerHTML = "";
    if (h) h.textContent = "";
    const book = exBook();
    body.innerHTML = `<p class="note">Escolha a matéria para começar.</p>
      <div class="exchoice">
        <button type="button" class="btnp exchoicebtn" id="exPickGram"${book?"":" disabled"}>Gramática</button>
        <button type="button" class="btng exchoicebtn" id="exPickVocab"${book && (book.vunits || []).length ? "" : " disabled"}>Vocabulário</button>
      </div>`;
    const bg = document.getElementById("exPickGram"), bv = document.getElementById("exPickVocab");
    if (bg) bg.onclick = () => openExSubject("gram");
    if (bv) bv.onclick = () => openExSubject("vocab");
  } else {
    bar.innerHTML = `<button type="button" class="btng exswitch" id="exSwitch">← Trocar matéria</button>
      <span class="exsubjlbl">${exSubj === "vocab" ? "Vocabulário" : exSubj === "gram" ? "Gramática" : "Exercícios do dia · gramática e vocabulário"}</span>`;
    const sw = document.getElementById("exSwitch");
    if (sw) sw.onclick = () => { exStage = "choose"; renderExStage(); };
    renderExercises();
  }
}
function exDailyAvailable(p){ const b = exBook(); return !!b && exLevelUnits(b,p).length > 0; }
function exDailyN(p){ return p.exDaily && p.exDaily.date === T ? p.exDaily.n : 0; }
function openExDaily(){ // atalho da missão "Exercícios do dia": abre direto uma sessão nova (mistura gramática e vocabulário)
  document.getElementById("mainLayout").hidden = true;
  document.getElementById("exView").hidden = false;
  openExSubject("all");
  window.scrollTo({top:0, behavior:"instant" in window ? "instant" : "auto"});
}
function openExSubject(subj){
  exSubj = subj; exStage = "list"; exSession = []; exAns = {}; exGraded = {};
  renderExStage();
}
function closeExView(){
  document.getElementById("exView").hidden = true;
  document.getElementById("mainLayout").hidden = false;
  renderAll();
}
