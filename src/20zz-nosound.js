/* sem áudio: itens de escuta viram exercícios escritos; remove o botão "Ouvir" */
(() => {
  for (const lvl in STEPU.en) for (const k in STEPU.en[lvl]) STEPU.en[lvl][k].units.forEach(u => u.items = u.items.map(it => {
    if (!it.say) return it;
    const say = it.say; delete it.say;
    if (it.t === "choice" && /^Ou[çc]a/i.test(it.q)) {
      const right = it.opts[it.a];
      if (exNorm(right) === exNorm(say)) return {t:"type", q:"Escreva em inglês esta palavra ou frase: “" + say + "”", a:[say]};
      it.q = "Leia: “" + say + "”. " + it.q.replace(/^Ou[çc]a[.:]?\s*/i, "").replace(/você (ouviu|escutou)/i, "leu");
    }
    return it;
  }));
})();
