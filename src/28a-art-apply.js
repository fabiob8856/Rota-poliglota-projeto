/* aplica as ilustrações: figura nos diálogos + unidades de vocabulário ilustrado */
(function(){
  const hash = s => { let h = 11; for (const c of String(s)) h = (h*31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
  const COL = {en:1, es:2, fr:3, ru:4, tr:5, ar:6};
  for (const lang of Object.keys(COL)){
    const B = EX_BOOKS[lang]; if (!B) continue; const c = COL[lang];
    const note = lang === "en" ? "" : " (conteúdo novo, ainda sem revisão de falante nativo)";
    B.units.forEach(u => { if (u.dgl){ const cap = "Ilustração: " + u.dgt;
      u.fig = {html:ART.dialog(hash(u.id), u.dgl[0], u.dgl[1], cap, lang === "ar"), cap}; } });
    const words = OBJ.map(o => o[c]);
    for (let k = 0; k * 6 < OBJ.length; k++){
      const idx = []; for (let i = k*6; i < Math.min(OBJ.length, k*6 + 6); i++) idx.push(i);
      if (idx.length < 4) continue;
      const items = [];
      idx.forEach(i => { const w = OBJ[i][c], o2 = words.filter(x => x !== w).sort((a, b) => hash(w + a) - hash(w + b)).slice(0, 2),
        all = [w].concat(o2), kk = hash(w) % 3, opts = all.map((_, j) => all[(j + kk) % 3]);
        items.push({t:"choice", q:"O que é isto?", opts, a:opts.indexOf(w), img:ART.obj(i)}); });
      idx.forEach(i => { const w = OBJ[i][c];
        if (lang === "ar"){ const pt = OBJ.map(o => o[0]), o2 = pt.filter(x => x !== OBJ[i][0]).sort((a, b) => hash(w + a) - hash(w + b)).slice(0, 2), all = [OBJ[i][0]].concat(o2), kk = hash(w + "p") % 3, opts = all.map((_, j) => all[(j + kk) % 3]);
          items.push({t:"choice", q:`O que significa “${w}”?`, opts, a:opts.indexOf(OBJ[i][0]), img:ART.obj(i)}); }
        else items.push({t:"text", q:"Escreva o nome desta imagem no idioma que você estuda", a:[w], hint:`Começa com “${Array.from(w)[0]}”`, img:ART.obj(i)}); });
      const html = '<div class="pgrid">' + idx.map(i => `<div class="pcell">${ART.obj(i)}<b>${esc(OBJ[i][c])}</b></div>`).join("") + "</div>";
      B.units.push({id:`im-${lang}-${k+1}`, title:`Imagens ${k+1}: vocabulário ilustrado`, lead:"Olhe as figuras, aprenda a palavra e responda." + note,
        expl:"Cada figura tem o nome embaixo. Observe, repita em voz alta e depois responda.", fig:{html, cap:"Figura — palavras ilustradas"}, lvl:"A1", items});
    }
  }
})();
