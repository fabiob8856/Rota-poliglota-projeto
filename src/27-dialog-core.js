/* ---------- Mini-diálogos: 4 falas (A, B, A, B) por diálogo; palavra em [colchetes] vira lacuna; botão "Ouvir" fala a frase ---------- */
const DGDATA = {};
(function(){
  window.DGBUILD = function(){
  const COL = {en:1, es:2, fr:3, ru:4, tr:5, ar:6};
  const hash = s => { let h = 5; for (const c of String(s)) h = (h*37 + c.charCodeAt(0)) | 0; return Math.abs(h); };
  const mergeP = a => a.reduce((o, w) => { if (o.length && /^[.,;:!?؟…»”)]+$/.test(w)) o[o.length-1] += w; else o.push(w); return o; }, []);
  const parse = txt => { const dl = []; let cur = null;
    txt.split("\n").forEach(l => { l = l.trim(); if (!l) return; if (l[0] === "#"){ cur = {t:l.slice(1).trim(), rows:[]}; dl.push(cur); } else if (cur) cur.rows.push(l.split("|").map((s, i) => i ? s.trim() : s.replace(/[\[\]]/g, "").trim())); });
    return dl.filter(d => d.rows.length === 4); };
  const rot = (right, others, seed) => { const all = [right].concat(others.slice(0,2)), k = hash(seed) % all.length, opts = all.map((_, j) => all[(j + k) % all.length]); return {opts, a: opts.indexOf(right)}; };
  for (const lvl of Object.keys(DGDATA)){
    const dls = parse(DGDATA[lvl]);
    for (const lang of Object.keys(COL)){
      const B = EX_BOOKS[lang]; if (!B) continue; const c = COL[lang];
      const note = lang === "en" ? "" : " (conteúdo novo, ainda sem revisão de falante nativo)";
      const plain = r => (r[c] || "").replace(/[\[\]]/g, "");
      dls.forEach((d0, di) => {
        const LN = {en:"inglês",es:"espanhol",fr:"francês",ru:"russo",tr:"turco",ar:"árabe"}; const d = {t:d0.t, rows:d0.rows.map(r => [r[0].replace(/\{L\}/g, LN[lang])].concat(r.slice(1)))}; const R = d.rows; if (R.some(r => !r[c])) return;
        const others = (k) => dls.filter((_, j) => j !== di).map(o => o.rows[k]).filter(r => r && r[c]);
        const pick = (k, f) => others(k).sort((a, b) => hash(d.t + f(a)) - hash(d.t + f(b))).slice(0, 2).map(f);
        const n = di + 1, id = `dg-${lang}-${lvl}-${n}`;
        const A1 = plain(R[0]), B1 = plain(R[1]), A2 = plain(R[2]), B2 = plain(R[3]);
        const items = [];
        let r1 = rot(R[0][0], pick(0, r => r[0].replace(/\{L\}/g, LN[lang])), id + "a"); items.push({t:"choice", q:"Ouça a fala e escolha o significado em português", opts:r1.opts, a:r1.a, say:A1});
        let r2 = rot(B1, pick(1, plain), id + "b"); items.push({t:"choice", q:`A: ${A1}  —  Qual resposta combina?`, opts:r2.opts, a:r2.a, say:A1});
        let r3 = rot(B2, pick(3, plain), id + "c"); items.push({t:"choice", q:`A: ${A2}  —  Qual resposta combina?`, opts:r3.opts, a:r3.a, say:A2});
        [1, 3].forEach(k => { const m = /\[([^\]]+)\]/.exec(R[k][c]); if (!m) return; const w = m[1], a = [w]; if (/ё/.test(w)) a.push(w.replace(/ё/g, "е"));
          items.push({t:"text", q:`Complete a resposta de B: ${R[k][c].replace(/\[[^\]]+\]/, "___").replace(/[\[\]]/g, "")}  —  ${R[k][0]}`, a, hint:`Começa com “${Array.from(w)[0]}”`, say:plain(R[k])}); });
        const words = mergeP(B2.split(/\s+/).filter(Boolean));
        if (words.length >= 3){ let perm = words.map((_, i) => [hash(B2 + i), i]).sort((a, b) => a[0] - b[0]).map(x => x[1]); if (perm.every((v, i) => v === i)) perm = perm.slice(1).concat(perm[0]);
          items.push({t:"order", q:`Monte a resposta de B: “${R[3][0]}”`, words, perm}); }
        const expl = "<p>Leia o diálogo, clique em Ouvir (se o navegador tiver voz) e depois responda.</p><ul>" + R.map((r, i) => `<li><b>${i % 2 ? "B" : "A"}:</b> ${esc(plain(r))}<br><small>${esc(r[0])}</small></li>`).join("") + "</ul>";
        B.units.push({id, title:`${lvl} · Diálogo ${n}: ${d.t}`, lead:"Mini-diálogo: ouça, entenda e responda." + note, expl, lvl, items, dgl:[A1, B1, A2, B2], dgt:d.t});
      });
    }
  }
  };
})();
