/* ---------- vocabulário temático A2–C2 (todos os idiomas), dentro da área Vocabulário ---------- */
const VLV = {
 A2:["rotina","compras","saude","viagem","clima"],
 B1:["emocoes","carreira","tecnologia","ambiente","opiniao"],
 B2:["negocios","midia","ciencia","sociedade","bemestar"],
 C1:["politica","economia","arte","argumento","mente"],
 C2:["academico","emocoes2","verbos","adjetivos","filosofia"]};
const vRows = th => VTHEMES[th].rows.map(r => r.split("|"));
const VLV_ST = (T,n) => [`Vocabulário: ${T.toLowerCase()}`, `Faça as sessões do dia e aprenda as ${n} palavras do tema ${T.toLowerCase()}.`, `Você reconhece e usa as ${n} palavras sem consultar.`];
function vDefineLvl(lang, lvl){
  STEPU[lang] = STEPU[lang] || {}; STEPU[lang][lvl] = STEPU[lang][lvl] || {};
  const B = EX_BOOKS[lang] = EX_BOOKS[lang] || {title:"Gramática essencial", units:[], vunits:[]};
  B.vunits = B.vunits || []; B.units = B.units || [];
  const allRows = []; const steps = LANG[lang].levels[lvl].steps;
  VLV[lvl].forEach((th, i) => {
    const T = VTHEMES[th], rows = vRows(th), k = 17 + i; allRows.push(...rows);
    STEPU[lang][lvl][k] = {vid:`vocabulário ${T.t.toLowerCase()} ${VL[lang].n} nível ${lvl}`, units:vUnitsOf(lang, rows, `su-${lvl}-${k}`)};
    if (!steps[k-1]) steps[k-1] = ST(...[VLV_ST(T.t, rows.length)[0], [VLV_ST(T.t, rows.length)[1], "Escreva 5 frases curtas com as palavras novas e leia em voz alta."], VLV_ST(T.t, rows.length)[2]]);
    if (lang !== "en") vUnitsOf(lang, rows, `vx-${lang}-${th}`).forEach(u => B.vunits.push({id:u.id, title:`${T.t} · ${u.title}`, lead:`Vocabulário ${lvl}: ${T.t.toLowerCase()}.`, lvl, expl:u.expl || "Revise o que já viu, agora em outra ordem.", vid:`vocabulário ${T.t.toLowerCase()} ${VL[lang].n}`, items:u.items.map(it => it.t === "type" ? {t:"text", q:it.q, a:it.a} : it)}));
  });
  /* etapas 3 e 4: revisão misturada de todos os temas do nível (inglês: as 50 unidades próprias do livro) */
  if (lang === "en"){
    const vu = (B.vunits || []).filter(u => u.lvl === lvl), h = Math.ceil(vu.length/2);
    [[3, vu.slice(0,h)], [4, vu.slice(h)]].forEach(([k, arr]) => { if (arr.length) STEPU.en[lvl][k] = {vid:`vocabulário inglês nível ${lvl}`, units:arr.map((u,i) => ({id:`su-${lvl}-${k}-${i+1}`, title:u.title, expl:u.expl || "", items:u.items}))}; });
  } else {
    [3,4].forEach((k, j) => { const un = vUnitsOf(lang, allRows, `su-${lvl}-${k}`).filter((_,i,a) => (i % 2) === j); STEPU[lang][lvl][k] = {vid:`vocabulário ${VL[lang].n} nível ${lvl}`, units:un}; });
  }
}
LANG_ORDER.forEach(l => Object.keys(VLV).forEach(lvl => vDefineLvl(l, lvl)));

/* plano do fluxograma: tudo de vocabulário numa única área */
FLOW_PLAN.A1 = {stages:[
 {n:"1 · Fundamentos", sub:"alfabeto, sons e números primeiro", areas:[{g:0, steps:[1,2]}, {g:1, t:"Vocabulário", steps:[4,3,17,18,19,20,21,22]}]},
 {n:"2 · Entender", sub:"", areas:[{g:2, steps:[5,6]}, {g:3, steps:[7,8]}]},
 {n:"3 · Praticar", sub:"fala, leitura e escrita podem andar juntas", areas:[{g:4, steps:[9,10]}, {g:5, steps:[11,12]}, {g:6, steps:[13,14]}]},
 {n:"4 · Prova do nível", sub:"", areas:[{g:7, steps:[15,16]}]}]};
Object.keys(VLV).forEach(lvl => { FLOW_PLAN[lvl] = {stages:[
 {n:"1 · Fundamentos", sub:"pronúncia e vocabulário podem andar juntos", areas:[{g:0, steps:[1,2]}, {g:1, t:"Vocabulário", steps:[3,4,17,18,19,20,21]}]},
 {n:"2 · Entender", sub:"", areas:[{g:2, steps:[5,6]}, {g:3, steps:[7,8]}]},
 {n:"3 · Praticar", sub:"fala, leitura e escrita podem andar juntas", areas:[{g:4, steps:[9,10]}, {g:5, steps:[11,12]}, {g:6, steps:[13,14]}]},
 {n:"4 · Prova do nível", sub:"", areas:[{g:7, steps:[15,16]}]}]}; });
