/* ---------- gramática A2–C2: ajudante + inglês (etapas 5 e 6 a partir dos livros) ---------- */
function gDefineLvl(lang, lvl, vid5, vid6, units){
  STEPU[lang] = STEPU[lang] || {}; STEPU[lang][lvl] = STEPU[lang][lvl] || {};
  const h = Math.ceil(units.length/2), mk = (k, vid, arr) => ({vid, units: arr.map((u,i) => ({id:`su-${lvl}-${k}-${i+1}`, title:u.title, expl:u.expl, items:u.items}))});
  STEPU[lang][lvl][5] = mk(5, vid5, units.slice(0,h)); STEPU[lang][lvl][6] = mk(6, vid6, units.slice(h));
  const B = EX_BOOKS[lang] = EX_BOOKS[lang] || {title:"Gramática essencial", units:[], vunits:[]}; B.units = B.units || [];
  units.forEach((u,i) => B.units.push({id:`gx-${lang}-${lvl}-${i+1}`, title:`Unidade ${i+1} · ${u.title}`, lead:`Gramática ${lvl}.`, lvl, expl:u.expl, vid:vid5, items:u.items.map(it => it.t === "type" ? {t:"text", q:it.q, a:it.a} : it)}));
}
/* inglês: as 50 unidades de cada nível já existem no livro; as etapas 5 e 6 usam metade cada */
["A2","B1","B2","C1","C2"].forEach(lvl => {
  const gu = (EX_BOOKS.en.units || []).filter(u => u.lvl === lvl), h = Math.ceil(gu.length/2);
  [[5, gu.slice(0,h)], [6, gu.slice(h)]].forEach(([k, arr]) => { STEPU.en[lvl][k] = {vid:`gramática inglês nível ${lvl}`, units:arr.map((u,i) => ({id:`su-${lvl}-${k}-${i+1}`, title:u.title, expl:u.expl || "", items:u.items}))}; });
});
