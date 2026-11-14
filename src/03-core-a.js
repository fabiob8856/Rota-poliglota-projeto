/* ---------- constantes compartilhadas ---------- */
const SUBJ = [
  {id:"pron",   n:"Pronúncia",   c:"#B8321F", icon:"M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"},
  {id:"vocab",  n:"Vocabulário", c:"#24377A", icon:"M6 3h12v18l-6-4-6 4z"},
  {id:"gram",   n:"Gramática",   c:"#6D3B83", icon:"M5 20V4h8a4 4 0 0 1 0 8H5M11 12l7 8"},
  {id:"escuta", n:"Escuta",      c:"#2F6B45", icon:"M4 15v-3a8 8 0 0 1 16 0v3M4 14h3v6H4zM17 14h3v6h-3z"},
  {id:"fala",   n:"Fala",        c:"#B5651D", icon:"M4 5h16v11h-9l-5 4v-4H4z"},
  {id:"leitura",n:"Leitura",     c:"#1F6E80", icon:"M3 5c3-1 6-1 9 1v14c-3-2-6-2-9-1zM21 5c-3-1-6-1-9 1v14c3-2 6-2 9-1z"},
  {id:"escrita",n:"Escrita",     c:"#7A4A2A", icon:"M20 3C12 5 7 11 5 21M20 3c-1 5-4 9-9 11M9 10h5"},
  {id:"prova",  n:"Prova",       c:"#8C6A14", icon:"M4 18h16M5 18l-1-10 5 4 3-7 3 7 5-4-1 10"}
];
const ST = (t, d, w) => ({t, d, w});
const LEVELS = [
  {id:"A1", name:"Primeiros passos", hours:90,  rank:"Iniciante",     desc:"Sons, palavras essenciais e frases para se apresentar."},
  {id:"A2", name:"Dia a dia",        hours:110, rank:"Aprendiz",      desc:"Rotina, passado e futuro: a base para conversar."},
  {id:"B1", name:"Conversa",         hours:180, rank:"Praticante",    desc:"Destravar a fala: contar histórias e manter uma conversa."},
  {id:"B2", name:"Trabalho",         hours:200, rank:"Conversador",   desc:"Reuniões, apresentações e entrevistas."},
  {id:"C1", name:"Fluência",         hours:240, rank:"Avançado",      desc:"Nuance, naturalidade e textos longos."},
  {id:"C2", name:"Domínio",          hours:300, rank:"Fluente",       desc:"Gírias, estilo e improviso em qualquer situação."}
];
const LVCOL = {A1:"#9A3A2A", A2:"#24377A", B1:"#2F6B45", B2:"#6D3B83", C1:"#8C6A14", C2:"#7A1F2B"};
const NSTEP = 16;
const DAYS = {
 1:{n:"Dia da Gramática", s:"Gramática", focus:"gram", intro:"Hoje você entende uma estrutura e já usa em frases sobre a sua vida.", b:[["rev",.2],["gram",.35],["gramWrite",.25],["speakTopic",.2]]},
 2:{n:"Dia da Escuta", s:"Escuta", focus:"escuta", intro:"Hoje o ouvido trabalha: ouvir com atenção, pegar detalhes e repetir o que ouviu.", b:[["rev",.15],["ouvir",.45],["transcribe",.2],["falar",.2]]},
 3:{n:"Dia do Vocabulário", s:"Vocabulário", focus:"vocab", intro:"Hoje você aprende palavras novas e já coloca todas em uso.", b:[["rev",.2],["vocabNew",.35],["escrever",.25],["speakTopic",.2]]},
 4:{n:"Dia da Conversa", s:"Conversa", focus:"fala", intro:"Hoje é para falar. Errar faz parte; o importante é não voltar para o português.", b:[["rev",.15],["shadow",.25],["convo",.6]]},
 5:{n:"Dia da Leitura", s:"Leitura", focus:"leitura", intro:"Hoje você lê, tira palavras do texto e resume com as suas palavras.", b:[["rev",.15],["ler",.5],["lerVocab",.15],["resumo",.2]]},
 6:{n:"Dia da Pronúncia", s:"Pronúncia", focus:"pron", intro:"Hoje você treina o som: imitar, gravar e comparar.", b:[["pron",.35],["shadow",.3],["record",.2],["rev",.15]]},
 0:{n:"Dia de Imersão", s:"Imersão", focus:null, intro:"Dia leve: curtir algo no idioma, revisar a semana e planejar a próxima.", b:[["serie",.6],["weekRev",.25],["planWeek",.15]]}
};
const KIND = {rev:["Revisão","#24377A"], vocabNew:["Vocabulário","#24377A"], gram:["Gramática","#6D3B83"], gramWrite:["Gramática","#6D3B83"], ouvir:["Escuta","#2F6B45"], transcribe:["Escuta","#2F6B45"], falar:["Fala","#B5651D"], speakTopic:["Fala","#B5651D"], convo:["Fala","#B5651D"], shadow:["Pronúncia e fala","#B8321F"], ler:["Leitura","#1F6E80"], lerVocab:["Vocabulário","#24377A"], resumo:["Escrita","#7A4A2A"], escrever:["Escrita","#7A4A2A"], pron:["Pronúncia","#B8321F"], record:["Pronúncia","#B8321F"], serie:["Imersão","#2F6B45"], weekRev:["Revisão","#24377A"], planWeek:["Planejamento","#8C6A14"]};
const DAYN = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const LANG = {};
const LANG_ORDER = ["en","es","fr","ru","tr","ar"];

/* ---------- estado ---------- */
const iso = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
let NOW = new Date(), T = iso(NOW);
function refreshDay(){ const n = new Date(), t = iso(n); if (t === T) return false; NOW = n; T = t; return true; }
const KEY = "mapa-idiomas-v3";
const freshLang = () => ({cfg:{min:45, days:[1,2,3,4,5,6], level:"A1", start:T}, log:{}, steps:{}, today:{date:T, done:[], extra:false}, notes:"", mlog:{}, ach:{}, fullDays:0});
let S = null;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
if (!S || !S.L) {
  S = {lang:"en", L:{}};
  try { const old = JSON.parse(localStorage.getItem("mapa-ingles-reinos-v2")); if (old && old.cfg) { S.L.en = {...freshLang(), ...old}; if (!S.L.en.notes) S.L.en.notes = ""; } } catch (e) {}
}
if (!LANG_ORDER.includes(S.lang)) S.lang = "en";
function P(){ if (!S.L[S.lang]) S.L[S.lang] = freshLang(); const p = S.L[S.lang]; if (!p.mlog) p.mlog = {}; if (!p.ach) p.ach = {}; if (!p.fullDays) p.fullDays = 0; if (!p.exlog) p.exlog = {}; if (!p.exXp) p.exXp = 0; if (!p.exDone) p.exDone = {}; if (!p.exSched) p.exSched = {}; if (!p.exDaily) p.exDaily = {date:"", n:0}; if (!p.exDays) p.exDays = {}; if (!p.wrDaily) p.wrDaily = {date:"", n:0}; if (!p.wrSeen) p.wrSeen = {}; if (!p.wrCount) p.wrCount = 0; if (!p.rev) p.rev = {}; if (!p.revXp) p.revXp = 0; if (!p.customDecks) p.customDecks = []; if (!p.revSessionDone) p.revSessionDone = {}; if (!p.today || p.today.date !== T) p.today = {date:T, done:[], extra:false}; return p; }
const addDays = (dstr, n) => { const d = new Date(dstr + "T00:00:00"); d.setDate(d.getDate() + n); return iso(d); };
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
let view = P().cfg.level, pend = null;

const CL = () => LANG[S.lang];
const lvl = id => LEVELS.find(l => l.id === id);
const lvData = id => CL().levels[id];
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const sk = (id,k) => id + "-" + k;
const isDone = (id,k) => !!P().steps[sk(id,k)];
const doneCount = id => flowAll(id).filter(k => isDone(id,k)).length;
const totalDone = () => LEVELS.reduce((a,l)=>a+doneCount(l.id),0);
const nextStep = id => { for (const k of flowAll(id)) if (!isDone(id,k)) return k; return 0; };
const subjOf = k => SUBJ[Math.floor((k-1)/2)];
const SIDX = id => SUBJ.findIndex(s => s.id === id);
function nextOf(id, sid){ const g = SIDX(sid); for (const k of [2*g+1, 2*g+2]) if (!isDone(id,k)) return k; return 0; }
const isStudy = d => P().cfg.days.includes(d.getDay());
const dayNum = d => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())/864e5);
const monthYear = d => d.toLocaleDateString("pt-BR",{month:"long", year:"numeric"});
const lower1 = s => s.charAt(0).toLowerCase() + s.slice(1);

/* ---------- plano do dia ---------- */
function blockText(kind, id, wk){
  const m = CL().mat[id], L = lvData(id), v = arr => arr[wk % arr.length];
  const gk = nextOf(id,"gram"), pk = nextOf(id,"pron");
  const gt = gk ? L.steps[gk-1] : null, pt = pk ? L.steps[pk-1] : null;
  switch (kind) {
    case "rev": return {t:"Faça as revisões do dia", h:"Comece por aqui: abra o Baralho de revisão aqui do site e repasse os baralhos pendentes. É o que fixa o que você já estudou."};
    case "vocabNew": return {t:`Aprenda ${m.words} palavras novas`, h:`Tema: ${m.vocab}. Para cada palavra, escreva uma frase sua e crie um cartão no Baralho de revisão.`};
    case "gram": return gt ? {t:`Estude: ${gt.t}`, h:gt.d.join(" ")} : {t:"Revise as estruturas que já estudou", h:"Releia suas anotações de gramática e refaça 5 frases de cada estrutura."};
    case "gramWrite": return {t:`Escreva 5 frases usando ${gt ? lower1(gt.t) : "a estrutura de hoje"}`, h:"Frases sobre a sua vida, não exemplos de livro. Peça para uma IA corrigir e reescreva."};
    case "ouvir": return {t:`Ouça ${m.listen}`, h:v(["Primeira vez sem pausar, só para pegar a ideia. Depois ouça de novo com legenda ou transcrição no idioma.","Anote 3 expressões novas enquanto ouve.","Escolha um tema de que você goste e ouça duas vezes."])};
    case "transcribe": return {t:"Transcreva 1 minuto do áudio", h:"Escolha 1 minuto, escreva tudo o que ouvir e compare com a legenda. Marque as palavras que escaparam."};
    case "falar": return {t:"Resuma em voz alta o que ouviu", h:"Fale 1 minuto sem ler, como se contasse para alguém. Grave no celular."};
    case "speakTopic": return {t:`Fale sobre ${m.speak}`, h:"Grave de 1 a 2 minutos sem roteiro. Ouça de volta e anote um erro para corrigir."};
    case "convo": return {t:m.convo, h:m.convoHow + " Depois, anote no Caderno 3 coisas que você não soube dizer."};
    case "shadow": return {t:"Shadowing: repita imitando um áudio", h:"Pegue um trecho curto do áudio da semana. Pause depois de cada frase e repita copiando ritmo e entonação. Faça o trecho 3 vezes."};
    case "ler": return {t:`Leia ${m.read}`, h:"Não pare em cada palavra. Sublinhe só as que impedem de entender a frase."};
    case "lerVocab": return {t:"Tire 5 palavras do texto", h:"Coloque no Baralho de revisão com a frase original do texto."};
    case "resumo": return {t:`Escreva um resumo de ${m.sum}`, h:"Com as suas palavras, sem copiar do texto. Peça para uma IA corrigir."};
    case "escrever": return {t:`Escreva ${m.write}`, h:"Use pelo menos 3 palavras que aprendeu hoje. Peça para uma IA corrigir e reescreva a versão certa."};
    case "pron": return pt ? {t:`Treine: ${pt.t}`, h:pt.d.join(" ")} : {t:"Treine os sons que ainda erra", h:"Escolha 10 palavras difíceis, ouça num dicionário com áudio e repita até sair natural."};
    case "record": return {t:"Grave-se lendo um parágrafo", h:"Compare com o áudio original e repita as palavras que soaram diferentes."};
    case "serie": return {t:`Assista ${m.series}`, h:"Hoje é para curtir e acostumar o ouvido. Se entender pouco, tudo bem."};
    case "weekRev": return {t:"Revise a semana", h:"Releia o Caderno e as palavras novas da semana. Confirme no mapa as etapas que cumpriu."};
    case "planWeek": return {t:"Planeje a próxima semana", h:"Veja no mapa as próximas etapas e separe o material: áudio, livro ou horário com tutor."};
  }
}
function plan(id){
  const M = mainBudget(), D = DAYS[NOW.getDay()], wk = Math.floor(dayNum(NOW)/7), pp = P(), ps = pp.pshuf, bs = (ps && ps.date === T && ps.b) ? ps.b : D.b;
  const doneK = pp.today && pp.today.done ? pp.today.done : [];
  /* blindagem: blocos já concluídos hoje nunca somem nem trocam: reservam 5 min+ antes de repartir o resto */
  const locked = bs.filter(([k]) => doneK.includes(k)), free = bs.filter(([k]) => !doneK.includes(k));
  const mk = (arr, budget) => {
    let bl = arr.map(([k,w], i) => ({k, w, i, m: Math.round(budget*w/5)*5})), sum = bl.reduce((a,b)=>a+b.m,0), guard = 0;
    while (bl.length && sum !== budget && guard++ < 80) {
      if (sum < budget) { bl.sort((a,b)=>(budget*b.w-b.m)-(budget*a.w-a.m)); bl[0].m += 5; sum += 5; }
      else { const t = bl.filter(b=>b.m>0).sort((a,b)=>(b.m-budget*b.w)-(a.m-budget*a.w))[0]; if (!t) break; t.m -= 5; sum -= 5; }
    }
    return bl;
  };
  const lw = locked.reduce((a,x) => a + x[1], 0), fw = free.reduce((a,x) => a + x[1], 0) || 1;
  let lockedBl = locked.map(([k,w], i) => ({k, w, i: bs.findIndex(x => x[0] === k), m: Math.max(5, Math.round(M*w/(lw+fw)/5)*5)}));
  const used = lockedBl.reduce((a,b) => a + b.m, 0), rest = Math.max(0, M - used);
  const freeBl = mk(free.map(([k,w]) => [k, w/fw]), rest).map(b => ({...b, i: bs.findIndex(x => x[0] === b.k)}));
  return [...lockedBl, ...freeBl].filter(b => b.m > 0).sort((a,b) => a.i - b.i).map(b => ({...b, ...blockText(b.k, id, wk)}));
}
function updateLog(){
  const p = P(), pl = plan(p.cfg.level);
  const m = pl.filter(b => p.today.done.includes(b.k)).reduce((a,b)=>a+b.m,0);
  if (m > 0) p.log[T] = {m, lv:p.cfg.level}; else delete p.log[T];
}
function streak(){
  let n = 0; const d = new Date(NOW), p = P();
  for (let i=0;i<500;i++){
    const k = iso(d);
    if (p.log[k]) n++;
    else if (isStudy(d) && k !== T) break;
    d.setDate(d.getDate()-1);
  }
  return n;
}
function bestStreak(){
  const p = P(), keys = Object.keys(p.log).sort(); if (!keys.length) return 0;
  let best = 0, run = 0, prev = null;
  for (const k of keys) {
    const d = new Date(k + "T00:00:00");
    if (prev) { const c = new Date(prev); c.setDate(c.getDate()+1); let gap = false; while (iso(c) < k) { if (isStudy(c)) { gap = true; break; } c.setDate(c.getDate()+1); } run = gap ? 1 : run + 1; } else run = 1;
    best = Math.max(best, run); prev = d;
  }
  return best;
}

/* ---------- cronômetro ---------- */
let TM = {k:null, total:0, left:0, running:false, iv:null, over:false};
function fmtT(s){ s = Math.max(0, Math.round(s)); return String(Math.floor(s/60)).padStart(2,"0") + ":" + String(s%60).padStart(2,"0"); }
function tmStart(k, mins){
  clearInterval(TM.iv);
  TM = {k, total:mins*60, left:mins*60, running:true, iv:null, over:false};
  TM.iv = setInterval(tmTick, 1000); renderToday();
}
function tmTick(){
  if (!TM.running) return;
  TM.left--;
  if (TM.left <= 0) {
    TM.left = 0; TM.running = false; TM.over = true; clearInterval(TM.iv);
    const p = P(); if (TM.k && !p.today.done.includes(TM.k)) { p.today.done.push(TM.k); }
    toast("Tempo! Missão concluída"); afterChange(); return;
  }
  const d = document.getElementById("tmDisp"); if (d) d.textContent = fmtT(TM.left);
}
function tmToggle(){ if (TM.over) return; TM.running = !TM.running; renderToday(); }
function tmStop(){ clearInterval(TM.iv); TM = {k:null, total:0, left:0, running:false, iv:null, over:false}; renderToday(); }
