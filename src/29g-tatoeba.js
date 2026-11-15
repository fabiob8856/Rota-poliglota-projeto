/* ---------- Gravações reais do Tatoeba: ouvir e unidades "Ouça e escreva" ---------- */
(function(){
  const D = window.TATO_SENT || {};
  const LN = {en:"inglês", es:"espanhol", fr:"francês", ru:"russo", tr:"turco", ar:"árabe"};
  const LV = ["A1","A2","B1","B2","C1","C2"];
  const strip = s => String(s).toLowerCase().trim().replace(/^[¿¡]+/, "").replace(/[.!?؟,;:“”"]+$/g, "").replace(/\s+/g, " ");
  const norm = (lang, s) => { let x = strip(s);
    if (["es","fr","tr"].includes(lang)) x = x.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/ß/g, "ss");
    if (lang === "ar") x = x.replace(/[ً-ٰـ]/g, "");
    return x; };
  const idx = {};
  window.TATO_FIND = (lang, text) => { const L = D[lang]; if (!L || !L.length) return null;
    if (!idx[lang]){ idx[lang] = new Map(); L.forEach(r => idx[lang].set(norm(lang, r[1]), r[0])); }
    return idx[lang].get(norm(lang, text)) || null; };
  const wc = t => String(t).trim().split(/\s+/).length;
  const lvl = n => LV[n <= 4 ? 0 : n <= 6 ? 1 : n <= 8 ? 2 : n <= 10 ? 3 : n <= 13 ? 4 : 5];
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  Object.keys(D).forEach(lang => {
    const B = EX_BOOKS[lang], L = D[lang]; if (!B || !L || !L.length) return;
    LV.forEach(l => {
      const rows = L.filter(r => lvl(wc(r[1])) === l); if (rows.length < 4) return;
      for (let k = 0, n = 1; k < rows.length && n <= 14; k += 6, n++){
        const grp = rows.slice(k, k + 6); if (grp.length < 4) break;
        const users = Array.from(new Set(grp.map(r => r[3]).filter(Boolean))), lics = Array.from(new Set(grp.map(r => r[4]).filter(Boolean)));
        B.units.push({id:`tt-${lang}-${l}-${n}`, title:`${l} · Ouça e escreva (voz real) ${n}`, lvl:l,
          lead:`Frases com gravação de pessoas reais. Ouça e escreva o que ouviu. Gravações do Tatoeba (tatoeba.org) — vozes de: ${users.join(", ") || "colaboradores"}; licenças: ${lics.join(", ") || "livres"}. Precisa de internet para tocar a gravação; sem ela, usa a voz do aparelho.`,
          expl:`<div class="exintro2"><b>Como funciona</b><p>Clique em “Ouvir” e escreva a frase em ${LN[lang]} do jeito que ouviu. A dica mostra o significado em português. Pontuação e maiúsculas não contam.</p></div>`,
          items: grp.map(r => ({t:"text", q:`Ouça a frase e escreva em ${LN[lang]}.`, a:[r[1]], hint:`Significa: “${r[2]}”`, say:r[1]}))});
      }
    });
  });
})();
