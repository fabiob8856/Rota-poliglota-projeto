/* Exercícios devem partir do idioma estudado (para quem fala português do Brasil): troca exemplos que falavam de inglês/francês dentro de cursos de outros idiomas */
(function(){
  const SW = {
    es:{test:/habl|fal[ao]/, rep:[[/ingl[eé]s/g,"español"],[/franc[eé]s/g,"español"],[/inglês/g,"espanhol"],[/francês/g,"espanhol"]]},
    fr:{test:/parl|fala/i, rep:[[/anglais/g,"français"],[/inglês/g,"francês"]]},
    ru:{test:/como o inglês/, rep:[[/como o inglês/g,"como o português"]]}
  };
  const fix = (lang, str) => { const c = SW[lang]; if (typeof str !== "string" || !c.test.test(str)) return str; let o = str; c.rep.forEach(r => { o = o.replace(r[0], r[1]); }); return o; };
  for (const lang of Object.keys(SW)){
    const B = EX_BOOKS[lang]; if (!B) continue;
    [].concat(B.units, B.vunits || []).forEach(u => {
      ["title","lead","expl"].forEach(k => { if (u[k]) u[k] = fix(lang, u[k]); });
      (u.items || []).forEach(it => { ["q","hint","fix"].forEach(k => { if (it[k]) it[k] = fix(lang, it[k]); });
        if (it.opts) it.opts = it.opts.map(o => fix(lang, o));
        if (Array.isArray(it.a)) it.a = it.a.map(o => fix(lang, o));
        if (it.words) it.words = it.words.map(o => fix(lang, o)); });
    });
  }
  /* o fix só valeu se o texto da pergunta mudou junto com a resposta; confere com as lacunas "___" */
})();
