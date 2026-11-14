/* ---------- pronúncia em trilha (etapas novas depois de 1 e 2) ---------- */
function pExpand(lang, lvl, topics){
  const steps = LANG[lang].levels[lvl].steps; STEPU[lang] = STEPU[lang] || {}; STEPU[lang][lvl] = STEPU[lang][lvl] || {};
  const P0 = FLOW_PLAN[lang + ":" + lvl] || FLOW_PLAN[lvl]; const plan = JSON.parse(JSON.stringify(P0)), ids = [];
  topics.forEach(([nm, units]) => {
    const k = steps.length + 1, all = units.map(u => ({title:u.title, expl:u.expl, items:u.items})), pool = units.flatMap(u => u.items);
    for (let j = 0; j < 2; j++){ const items = []; for (let i = 0; i < Math.min(4, pool.length); i++) items.push(pool[(j * 3 + i * 2 + (i * 2 >= pool.length ? 1 : 0)) % pool.length]); all.push({title:`Revisão ${j+1}`, expl:"Revise o que já viu, em outra ordem.", items}); }
    STEPU[lang][lvl][k] = {vid:`pronúncia ${VL[lang].n} ${nm.toLowerCase()} nível ${lvl}`, units: all.map((u,i) => ({id:`su-${lvl}-${k}-${i+1}`, title:u.title, expl:u.expl || "", items:u.items}))};
    steps[k-1] = ST(`Pronúncia: ${nm.toLowerCase()}`, [`Faça as sessões do dia: ${all.length} unidades sobre ${nm.toLowerCase()}.`, "Leia as palavras em voz alta e grave-se; compare com um áudio nativo."], "Você acerta as unidades e reproduz os sons com clareza.");
    ids.push(k);
  });
  plan.stages.forEach(s => s.areas.forEach(a => { if (a.g === 0) a.steps = a.steps.concat(ids); }));
  FLOW_PLAN[lang + ":" + lvl] = plan;
}
