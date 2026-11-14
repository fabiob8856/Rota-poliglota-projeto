/* ---------- limpeza: remove perguntas repetidas (mesma frase + mesma resposta) dentro de cada nível / etapa ----------
   As unidades de "Revisão" repetiam as mesmas perguntas da unidade-mãe; agora cada pergunta aparece uma só vez por nível (exercícios)
   ou por etapa (rota). Unidades que ficariam com menos de 3 perguntas são removidas. */
(function(){
  const ans = it => it.t === "choice" ? String(it.opts[it.a]) : String((it.a && it.a[0]) || "");
  const key = it => it.q + "|" + ans(it);
  const MIN = 3;
  for (const lang of Object.keys(EX_BOOKS)){
    const B = EX_BOOKS[lang];
    for (const L of LEVELS){
      const seen = new Set();
      const run = list => list.filter(u => {
        if (u.lvl !== L.id) return true;
        u.items = u.items.filter(it => { const k = key(it); if (seen.has(k)) return false; seen.add(k); return true; });
        return u.items.length >= MIN;
      });
      B.units = B.units.filter(u => u.lvl !== L.id).concat(run(B.units.filter(u => u.lvl === L.id)));
      if (B.vunits) B.vunits = B.vunits.filter(u => u.lvl !== L.id).concat(run(B.vunits.filter(u => u.lvl === L.id)));
    }
  }
  for (const lang of Object.keys(STEPU)) for (const lvl of Object.keys(STEPU[lang])) for (const k of Object.keys(STEPU[lang][lvl])){
    const cont = STEPU[lang][lvl][k], seen = new Set();
    const kept = cont.units.filter(u => {
      u.items = u.items.filter(it => { const kk = key(it); if (seen.has(kk)) return false; seen.add(kk); return true; });
      return u.items.length >= MIN;
    });
    if (kept.length >= 4) cont.units = kept; /* etapa muito pequena: mantém como estava */
  }
})();
