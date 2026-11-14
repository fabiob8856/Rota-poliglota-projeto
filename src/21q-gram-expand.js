/* ---------- gramática em trilha para os outros idiomas: 50 unidades por nível ---------- */
/* linha de exercício: "Ayer yo [hablé|hablo|hablaba|hablaré] con Ana.~Ontem eu falei com Ana."  (1ª opção = correta) */
function gcloze(row){
  const [txt, gl] = row.split("~"), m = txt.match(/\[([^\]]+)\]/), opts = m[1].split("|"), right = opts[0];
  return vChoice("Complete: " + txt.replace(m[0], "___") + (gl ? "  —  " + gl : ""), right, opts.slice(1));
}
const GX = (title, expl, rows) => ({title, expl, items: rows.map(gcloze)});
function gExpand(lang, lvl, names0, extra){
  const names = names0.slice(); while (names.length < 2 + extra.length) names.push("Tema " + (names.length + 1));
  const k8 = flowGramIds(lvl, 2 + extra.length), old = [5,6].map(k => ((STEPU[lang][lvl] || {})[k] || {units:[]}).units);
  const topics = [old[0], old[1]]; let n = 0;
  extra.forEach((arr) => topics.push(arr.map(u => ({id:"", title:u.title, expl:u.expl, items:u.items}))));
  const learnN = topics.reduce((s,t) => s + t.length, 0), mixTot = Math.max(0, 50 - learnN), B = EX_BOOKS[lang];
  B.units = (B.units || []).filter(u => !(u.lvl === lvl));
  let mixLeft = mixTot, tl = topics.length, out = [];
  topics.forEach((units, ti) => {
    const q = Math.round(mixLeft / (tl - ti)); mixLeft -= q;
    const pool = units.flatMap(u => u.items), all = units.slice();
    for (let j = 0; j < q; j++){ const items = [], m = Math.min(4, pool.length), st = (j * 3 + Math.floor(j / Math.max(1, pool.length)) ) % Math.max(1, pool.length);
      for (let i = 0; i < m; i++) items.push(pool[(st + i * 2 + (i * 2 >= pool.length ? 1 : 0)) % pool.length]);
      all.push({title:`Revisão ${j+1}`, expl:"Revise o que já viu, em outra ordem.", items}); }
    const k = k8[ti];
    STEPU[lang][lvl][k] = {vid:`gramática ${VL[lang].n} ${names[ti].toLowerCase()} nível ${lvl}`, units: all.map((u,i) => ({id:`su-${lvl}-${k}-${i+1}`, title:u.title, expl:u.expl || "", items:u.items}))};
    const steps = LANG[lang].levels[lvl].steps;
    if (ti >= 2) steps[k-1] = ST(`Gramática: ${names[ti].toLowerCase()}`, [`Faça as sessões do dia: ${all.length} unidades de ${names[ti].toLowerCase()}.`, "Escreva 3 frases suas usando cada estrutura nova."], "Você acerta as unidades do tema sem consultar a explicação.");
    else steps[k-1] = ST(`Gramática: ${names[ti].toLowerCase()}`, [`Faça as sessões do dia: ${all.length} unidades de ${names[ti].toLowerCase()}.`, "Escreva 3 frases suas usando cada estrutura nova."], "Você acerta as unidades do tema sem consultar a explicação.");
    all.forEach(u => out.push(u));
  });
  out.forEach((u,i) => B.units.push({id:`gx-${lang}-${lvl}-${i+1}`, title:`Unidade ${i+1} · ${u.title}`, lead:`Gramática ${lvl}.`, lvl, expl:u.expl || "", vid:`gramática ${VL[lang].n} nível ${lvl}`, items:u.items}));
  const P = FLOW_PLAN[lvl]; FLOW_PLAN[lang + ":" + lvl] = JSON.parse(JSON.stringify(P));
  FLOW_PLAN[lang + ":" + lvl].stages.forEach(s => s.areas.forEach(a => { if (a.g === 2){ a.t = "Gramática"; a.steps = k8.slice(); } }));
}
