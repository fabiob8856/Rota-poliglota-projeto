/* ---------- exercícios derivados 2: "Monte a frase" (ordenar palavras) e "Qual frase está certa?" ----------
   Feitos a partir das frases com lacuna JÁ existentes em cada idioma/nível (a resposta certa vem do exercício original; nada é inventado). */
(function(){
  const PER = 6, MAXU = 12;
  const hash = str => { let h = 11; for (const c of str) h = (h*31 + c.charCodeAt(0)) | 0; return h; };
  const tidy = it => {
    let q = it.q.replace(/^[^:_]{1,60}:\s*/, ""), gloss = "";
    const gi = q.indexOf(" — "); if (gi > 0){ gloss = q.slice(gi + 3).trim().replace(/[.!?]+$/, ""); q = q.slice(0, gi); }
    q = q.replace(/\s*\([^)]*\)\s*$/, "").replace(/\s{2,}/g, " ").trim();
    return {q, gloss};
  };
  const mergeP = a => a.reduce((o, w) => { if (o.length && /^[.,;:!?؟…»”)]+$/.test(w)) o[o.length-1] += w; else o.push(w); return o; }, []);
  for (const lang of Object.keys(EX_BOOKS)){
    const B = EX_BOOKS[lang];
    for (const L of LEVELS){
      const lvl = L.id, rng = mulberry(hash(lang + lvl + "o"));
      const src = [...B.units, ...(B.vunits || [])].filter(u => u.lvl === lvl && !/^dv-/.test(u.id));
      const pool = [], seen = new Set();
      src.forEach(u => u.items.forEach(it => {
        if (it.t !== "choice" || it.opts.length < 2 || (it.q.match(/___/g) || []).length !== 1) return;
        const {q, gloss} = tidy(it); if (!/___/.test(q)) return;
        const right = it.opts[it.a], sent = q.replace("___", right).replace(/\s+([.,;:!?؟])/g, "$1").trim();
        if (seen.has(sent) || /[“”":«»]/.test(sent)) return; seen.add(sent); /* citações e definições não são frases */
        if ((lang === "ru" || lang === "ar") && /[A-Za-zÀ-ÿ]{2,}/.test(sent)) return; /* mistura com português */
        pool.push({it, q, gloss, right, sent});
      }));
      const order = pool.map(x => [rng(), x]).sort((a,b) => a[0] - b[0]).map(x => x[1]);
      /* Monte a frase */
      const ord = [];
      order.forEach(x => {
        const words = mergeP(x.sent.split(/\s+/).filter(Boolean));
        if (words.length < 4 || words.length > 10 || /[“"].*[”"]/.test(x.sent) && /\?/.test(x.gloss) && false) return;
        let perm = words.map((_, i) => i).map(i => [rng(), i]).sort((a,b) => a[0] - b[0]).map(y => y[1]);
        if (perm.every((v, i) => v === i)) perm = perm.slice(1).concat(perm[0]);
        ord.push({t:"order", q: x.gloss ? `Monte a frase: “${x.gloss}”` : "Monte a frase na ordem certa.", words, perm, _len: words.length});
      });
      ord.sort((a,b) => a._len - b._len);
      for (let ui = 0; ui < MAXU && (ui + 1) * PER <= ord.length; ui++){
        B.units.push({id:`dv-${lang}-${lvl}-o${ui+1}`, title:`${lvl} · Monte a frase ${ui+1}`, lead:"Coloque as palavras na ordem certa.", expl:"Toque nas palavras <b>na ordem certa</b> para montar a frase. Toque numa palavra já escolhida para tirá-la.", lvl, items:ord.slice(ui*PER, (ui+1)*PER).map(({_len, ...r}) => r)});
      }
      /* Qual frase está certa? */
      const sc = [];
      order.forEach(x => {
        const wrongs = x.it.opts.filter((o, i) => i !== x.it.a).slice(0, 2); if (!wrongs.length) return;
        if (x.sent.split(/\s+/).length < 3) return;
        const fill = o => x.q.replace("___", o).replace(/\s+([.,;:!?؟])/g, "$1").trim();
        const all = [x.sent].concat(wrongs.map(fill)); if (new Set(all).size !== all.length) return;
        const r = Math.abs(hash(x.sent)) % all.length, opts = all.map((_, i) => all[(i + r) % all.length]);
        sc.push({t:"choice", q: x.gloss ? `Qual frase significa “${x.gloss}”?` : "Qual frase está escrita corretamente?", opts, a: opts.indexOf(x.sent), _len: x.sent.length});
      });
      sc.sort((a,b) => a._len - b._len);
      for (let ui = 0; ui < MAXU && (ui + 1) * PER <= sc.length; ui++){
        B.units.push({id:`dv-${lang}-${lvl}-s${ui+1}`, title:`${lvl} · Qual frase está certa? ${ui+1}`, lead:"Escolha a frase correta.", expl:"Leia as opções com calma e escolha a <b>frase escrita corretamente</b>.", lvl, items:sc.slice(ui*PER, (ui+1)*PER).map(({_len, ...r}) => r)});
      }
    }
  }
})();
