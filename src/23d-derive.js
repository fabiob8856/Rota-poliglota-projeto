/* ---------- exercícios derivados: "Ache o erro" e "Complete a frase" a partir das frases com lacuna que já existem em cada idioma/nível ----------
   Cada frase usa a resposta certa do exercício de múltipla escolha; no "Ache o erro" a lacuna recebe uma opção errada e você toca na palavra errada.
   A ordem vai das frases mais curtas (mais fáceis) para as mais longas (mais difíceis). */
(function(){
  const PER = 6, N_FIND = 10, N_FILL = 10;
  const hash = str => { let h = 7; for (const c of str) h = (h*31 + c.charCodeAt(0)) | 0; return h; };
  for (const lang of Object.keys(EX_BOOKS)){
    const B = EX_BOOKS[lang];
    for (const L of LEVELS){
      const lvl = L.id, rng = mulberry(hash(lang + lvl));
      const src = [...B.units, ...(B.vunits || [])].filter(u => u.lvl === lvl && !/^dv-/.test(u.id));
      const pool = [];
      src.forEach(u => u.items.forEach(it => { if (it.t === "choice" && it.opts.length >= 2 && (it.q.match(/___/g) || []).length === 1) pool.push(it); }));
      const seen = new Set(), uniq = pool.filter(it => { const k = it.q + "|" + it.opts[it.a]; if (seen.has(k)) return false; seen.add(k); return true; });
      const sh = uniq.map(it => [rng(), it]).sort((a,b) => a[0] - b[0]).map(x => x[1]);
      const take = sh.slice(0, PER * (N_FIND + N_FILL));
      const half = Math.min(PER * N_FIND, Math.floor(take.length / 2));
      const forFind = take.slice(0, half).sort((a,b) => a.q.length - b.q.length), forFill = take.slice(half).sort((a,b) => a.q.length - b.q.length);
      const chunk = (arr, n) => { const o = []; for (let i = 0; i + n <= arr.length; i += n) o.push(arr.slice(i, i + n)); return o; };
      const mkFind = (it, k) => {
        const n = it.opts.length, wrong = it.opts[(it.a + 1 + (k % (n - 1))) % n], right = it.opts[it.a];
        let tpl = it.q.replace(/^[^:_]{1,60}:\s*/, "").replace(/\s*\([^)]*\)\s*$/, "").replace(/\s{2,}/g, " ").trim(), gloss = "";
        const gi = tpl.indexOf(" — "); if (gi > 0){ gloss = tpl.slice(gi + 3).trim(); tpl = tpl.slice(0, gi).trim(); }
        const mergeP = a => a.reduce((o, w) => { if (o.length && /^[.,;:!?؟…»”)]+$/.test(w)) o[o.length-1] += w; else o.push(w); return o; }, []);
        const parts = tpl.split("___"), before = mergeP(parts[0].split(/\s+/).filter(Boolean)), attached = parts[0].length > 0 && !/\s$/.test(parts[0]);
        if (attached && parts[1] && !/^[\s.,;:!?؟»”)]/.test(parts[1])) return null; // lacuna no meio da palavra (sufixo): não serve
        const words = mergeP(tpl.replace("___", wrong).split(/\s+/).filter(Boolean)), idx = attached ? before.length - 1 : before.length;
        if (words.length < 3 || idx < 0 || idx >= words.length || right.length < 3 && !/[^\u0000-\u024F]/.test(right) && false) return null;
        return {t:"find", q:"Toque na palavra que está errada." + (gloss ? " (" + gloss + ")" : ""), words, a: idx, fix: right};
      };
      const findItems = forFind.map((it, k) => mkFind(it, k)).filter(Boolean);
      chunk(findItems, PER).forEach((items, ui) => {
        B.units.push({id:`dv-${lang}-${lvl}-f${ui+1}`, title:`${lvl} · Ache o erro ${ui+1}`, lead:"Em cada frase há uma palavra errada.", expl:"Leia a frase com atenção e <b>toque na palavra que não combina</b>. Ao concluir, você vê qual era o erro e a forma certa.", lvl, items});
      });
      chunk(forFill, PER).forEach((g, ui) => {
        const items = g.map(it => { const r = it.opts[it.a], easy = lvl === "A1" || lvl === "A2";
          return {t:"text", q: /^Complete\s*:/i.test(it.q) ? it.q.replace(/^Complete\s*:\s*/i, "Complete a frase: ") : (/^[^:_]{1,60}:/.test(it.q) ? it.q : "Complete a frase: " + it.q), a:[r], hint: easy ? `Começa com “${[...r][0]}”` : ""}; });
        B.units.push({id:`dv-${lang}-${lvl}-c${ui+1}`, title:`${lvl} · Complete a frase ${ui+1}`, lead:"Escreva a palavra que falta.", expl:"Leia a frase e <b>digite a palavra que completa</b> o espaço. A resposta é conferida automaticamente.", lvl, items});
      });
    }
  }
})();
