/* ---------- correções pontuais de questões ambíguas ---------- */
(function(){
  const B = EX_BOOKS.ar; if (!B) return;
  for (const u of B.units) u.items.forEach(it => {
    if (it.t !== "choice" || !/Com licença/.test(it.q)) return; /* "عفوا" também significa "com licença": tira a alternativa duvidosa */
    const ai = it.opts.indexOf("عفوا"); if (ai >= 0 && ai !== it.a) it.opts[ai] = "صباح الخير";
  });
})();
