/* ---------- gerador das etapas de vocabulário (todos os idiomas) + novo plano do fluxograma A1 ---------- */
const VL = {en:{i:1,n:"inglês",latin:1}, es:{i:2,n:"espanhol",latin:1}, fr:{i:3,n:"francês",latin:1}, ru:{i:4,n:"russo"}, tr:{i:5,n:"turco",latin:1}, ar:{i:6,n:"árabe"}};
const vFold = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ı/g,"i").replace(/ß/g,"ss").replace(/œ/g,"oe");
const vH = s => { let h = 7; for (const ch of String(s)) h = (h*31 + ch.charCodeAt(0)) >>> 0; return h; };
const vEsc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
function vChoice(q, right, wrongs){
  const all = [right].concat(wrongs), r = vH(q) % all.length, o = all.map((_,i) => all[(i+r) % all.length]);
  return {t:"choice", q, opts:o, a:o.indexOf(right)};
}
function vWrongs(rows, wi, col, n, salt){
  const out = [], right = rows[wi][col]; let j = vH(rows[wi][0] + salt) % rows.length, guard = 0;
  while (out.length < n && guard++ < 200){ const w = rows[j % rows.length][col]; if (j % rows.length !== wi && w !== right && !out.includes(w)) out.push(w); j += 3 + (guard % 5); }
  return out;
}
function vItem(lang, rows, wi, kind){
  const L = VL[lang], col = L.i, pt = rows[wi][0], tw = rows[wi][col];
  if (kind === 0) return vChoice(`Qual é o significado de “${tw}”?`, pt, vWrongs(rows, wi, 0, 3, "a"));
  if (kind === 1 || !L.latin) return vChoice(kind === 1 ? `Como se diz “${pt}” em ${L.n}?` : `Qual palavra em ${L.n} significa “${pt}”?`, tw, vWrongs(rows, wi, col, 3, kind === 1 ? "b" : "c"));
  const ans = [tw]; if (vFold(tw) !== tw) ans.push(vFold(tw));
  return {t:"type", q:`Escreva em ${L.n}: “${pt}”`, a:ans, hint:"sem artigo"};
}
function vUnitsOf(lang, rows, key){
  const N = rows.length, units = []; let n = 0;
  for (let s = 0; s < N; s += 4){
    const idx = [0,1,2,3].map(i => (s+i) % N);
    units.push({id:`${key}-${++n}`, title:`Palavras ${s+1} a ${s+4}`, expl:idx.map(i => `<b>${vEsc(rows[i][VL[lang].i])}</b> = ${vEsc(rows[i][0])}`).join(" · "), items:idx.map((wi,i) => vItem(lang, rows, wi, (i + n) % 3))});
  }
  const mixN = Math.max(8, Math.floor(N/3));
  for (let j = 0; j < mixN; j++){
    const idx = []; let x = (j*5) % N; while (idx.length < 4){ if (!idx.includes(x)) idx.push(x); x = (x + 7 + idx.length*2) % N; }
    units.push({id:`${key}-${++n}`, title:`Revisão ${j+1}`, expl:"", items:idx.map((wi,i) => vItem(lang, rows, wi, (i + j + 1) % 3))});
  }
  return units;
}
const VSTEP = {3:"essencial", 17:"comida", 18:"familia", 19:"casa", 20:"corpo", 21:"cidade", 22:"trabalho"};
function vDefine(lang){
  STEPU[lang] = STEPU[lang] || {}; STEPU[lang].A1 = STEPU[lang].A1 || {};
  for (const [k, th] of Object.entries(VSTEP)){
    if (+k === 3 && lang === "en") continue; // o inglês já tem as 20 unidades próprias da etapa 3
    const T = VTHEMES[th], rows = T.rows.map(r => r.split("|"));
    STEPU[lang].A1[k] = {vid:`vocabulário de ${T.t.toLowerCase()} em ${VL[lang].n} para iniciantes`, units:vUnitsOf(lang, rows, `su-A1-${k}`)};
  }
  EX_BOOKS[lang] = EX_BOOKS[lang] || {title:"Gramática essencial", src:"Frases e explicações escritas por nós, organizadas em temas do A1.", units:[]};
  const B = EX_BOOKS[lang]; B.vunits = B.vunits || [];
  B.vsrc = B.vsrc || "Vocabulário do A1 organizado por temas do dia a dia — palavras e exercícios escritos por nós.";
  if (lang !== "en") for (const th of ["comida","familia","casa","corpo","cidade","trabalho"]){
    const T = VTHEMES[th], rows = T.rows.map(r => r.split("|"));
    vUnitsOf(lang, rows, `vx-${lang}-${th}`).forEach(u => B.vunits.push({id:u.id, title:`${T.t} · ${u.title}`, lead:`Vocabulário A1: ${T.t.toLowerCase()}.`, lvl:"A1", expl:u.expl || "Revise o que já viu, agora em outra ordem.", vid:`vocabulário de ${T.t.toLowerCase()} em ${VL[lang].n}`, items:u.items.map(it => it.t === "type" ? {t:"text", q:it.q, a:it.a} : it)}));
  }
}
LANG_ORDER.forEach(vDefine);

/* ---------- etapas novas (17–22) no A1 de todos os idiomas ---------- */
const NEWST = [
 ["Vocabulário: comida e frutas","Faça as sessões do dia e aprenda as 24 palavras de comida, bebida e frutas.","Você reconhece e usa as 24 palavras sem consultar."],
 ["Vocabulário: família e pessoas","Aprenda as 20 palavras de família e pessoas e fale de quem faz parte da sua vida.","Você apresenta sua família com as palavras do tema."],
 ["Vocabulário: casa e objetos","Aprenda as 24 palavras de cômodos e objetos e nomeie o que há em volta de você.","Você nomeia 15 objetos da sua casa sem consultar."],
 ["Vocabulário: corpo, roupas e cores","Aprenda partes do corpo, roupas e cores e descreva o que você veste.","Você descreve sua roupa de hoje com cores e peças."],
 ["Vocabulário: cidade e viagem","Aprenda lugares da cidade e palavras de transporte e viagem.","Você pergunta e entende lugares e transportes básicos."],
 ["Vocabulário: trabalho e estudos","Aprenda palavras de trabalho, profissões e material de estudo.","Você fala da sua profissão e do seu dia de trabalho."]];
LANG_ORDER.forEach(l => { const A = LANG[l].levels.A1.steps; NEWST.forEach((x,i) => { if (!A[16+i]) A[16+i] = ST(x[0], [x[1], "Escreva 5 frases curtas com as palavras novas e leia em voz alta."], x[2]); }); });

FLOW_PLAN.A1 = {stages:[
 {n:"1 · Fundamentos", sub:"alfabeto, sons e números primeiro", areas:[{g:0, steps:[1,2]}, {g:1, t:"Vocabulário essencial", steps:[4,3]}]},
 {n:"2 · Entender", sub:"", areas:[{g:2, steps:[5,6]}, {g:3, steps:[7,8]}]},
 {n:"3 · Vocabulário do dia a dia", sub:"um tema de cada vez, na ordem", areas:[{g:1, t:"Casa e alimentação", steps:[17,18,19]}, {g:1, t:"O mundo à sua volta", steps:[20,21,22]}]},
 {n:"4 · Praticar", sub:"fala, leitura e escrita podem andar juntas", areas:[{g:4, steps:[9,10]}, {g:5, steps:[11,12]}, {g:6, steps:[13,14]}]},
 {n:"5 · Prova do nível", sub:"", areas:[{g:7, steps:[15,16]}]}]};
