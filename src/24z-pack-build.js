/* ---------- constrói os pacotes de cenas: 3 unidades por cena (completar, montar a frase, qual frase significa) ---------- */
function PKBUILD(PKDATA, PFX, OFF){
  const COL = {en:1, es:2, fr:3, ru:4, tr:5, ar:6};
  const hash = s => { let h = 13; for (const c of String(s)) h = (h*31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
  const mergeP = a => a.reduce((o, w) => { if (o.length && /^[.,;:!?؟…»”)]+$/.test(w)) o[o.length-1] += w; else o.push(w); return o; }, []);
  const parse = txt => { const sc = []; let cur = null;
    txt.split("\n").forEach(l => { l = l.trim(); if (!l) return; if (l[0] === "#"){ cur = {t:l.slice(1).trim(), rows:[]}; sc.push(cur); } else if (cur) cur.rows.push(l.split("|").map(s => s.trim())); });
    return sc; };
  for (const lvl of Object.keys(PKDATA)){
    const scenes = parse(PKDATA[lvl]);
    for (const lang of Object.keys(COL)){
      const B = EX_BOOKS[lang]; if (!B) continue;
      const note = lang === "en" ? "" : " (conteúdo novo, ainda sem revisão de falante nativo)";
      scenes.forEach((sc, si) => {
        const LN = {en:"inglês",es:"espanhol",fr:"francês",ru:"russo",tr:"turco",ar:"árabe"}; const rows = sc.rows.map(r => { r = [r[0].replace(/\{L\}/g, LN[lang])].concat(r.slice(1)); const tg = r[COL[lang]]; if (!tg) return null; const m = /\[([^\]]+)\]/.exec(tg); if (!m) return null;
          const plain = tg.replace(/[\[\]]/g, ""); return {pt:r[0], plain, word:m[1], blank:tg.replace(/\[[^\]]+\]/, "___")}; }).filter(Boolean);
        if (rows.length < 4) return;
        const n = si + 1 + OFF, id = x => `${PFX}-${lang}-${lvl}-s${n}-${x}`, ttl = x => `${lvl} · Cena ${n}: ${sc.t} · ${x}`;
        const expl = "<ol>" + rows.map(r => `<li><b>${esc(r.plain)}</b><br><small>${esc(r.pt)}</small></li>`).join("") + "</ol>";
        /* a) completar digitando */
        B.units.push({_rows:rows.map(r => ({pt:r.pt, plain:r.plain})), id:id("a"), title:ttl("Complete"), lead:"Leia a cena e escreva a palavra que falta." + note, expl:"Estas são as frases da cena. Leia, repare nas palavras e depois complete as lacunas." + expl, lvl,
          items: rows.map(r => { const ans = [r.word]; if (/ё/.test(r.word)) ans.push(r.word.replace(/ё/g, "е"));
            return {t:"text", q:`Complete: ${r.blank}  —  ${r.pt}`, a:ans, hint:`Começa com “${Array.from(r.word)[0]}”`}; })});
        /* b) montar a frase */
        const ord = rows.map(r => { const words = mergeP(r.plain.split(/\s+/).filter(Boolean)); if (words.length < 3) return null;
          let perm = words.map((_, i) => [hash(r.plain + i), i]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
          if (perm.every((v, i) => v === i)) perm = perm.slice(1).concat(perm[0]);
          return {t:"order", q:`Monte a frase: “${r.pt}”`, words, perm}; }).filter(Boolean);
        if (ord.length >= 4) B.units.push({id:id("b"), title:ttl("Monte a frase"), lead:"Coloque as palavras na ordem certa." + note, expl:"Toque nas palavras <b>na ordem certa</b> para montar a frase em português → idioma." , lvl, items:ord});
        /* c) qual frase significa */
        const ch = rows.map((r, i) => { const others = rows.filter((_, j) => j !== i).map(o => o.plain).sort((a, b) => hash(r.plain + a) - hash(r.plain + b)).slice(0, 2);
          const all = [r.plain].concat(others), k = hash(r.plain) % all.length, opts = all.map((_, j) => all[(j + k) % all.length]);
          return {t:"choice", q:`Qual frase significa “${r.pt}”?`, opts, a:opts.indexOf(r.plain)}; });
        B.units.push({id:id("c"), title:ttl("Qual frase significa?"), lead:"Escolha a frase que traduz o português." + note, expl:"Leia o português e escolha a frase correta no idioma." , lvl, items:ch});
      });
    }
  }
}
PKBUILD(PKDATA, "pk", 0);
