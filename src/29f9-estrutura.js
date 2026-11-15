/* ---------- Estrutura da linguagem: classes de palavras em cada idioma ---------- */
(function(){
  const CATS = [["verbs","Verbos"],["noun","Substantivos"],["pron","Pronomes"],["adj","Adjetivos"],["art","Artigos"],["adv","Advérbios"],["prep","Preposições"],["conj","Conjunções"]];
  const e = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const AR = /[؀-ۿ]/;
  let cat = "verbs", tense = null, q = "";
  const rows = str => String(str).split("\n").map(l => l.trim()).filter(Boolean).map(l => l.split("|"));
  function cell(v, lang){ return lang === "ar" && AR.test(v) ? `<td class="estar" dir="rtl" lang="ar">${e(v)}</td>` : `<td>${e(v)}</td>`; }
  function table(head, data, lang){
    return `<div class="estscroll"><table class="esttb"><thead><tr>${head.map(h => `<th>${e(h)}</th>`).join("")}</tr></thead><tbody>${data.map(r => `<tr>${r.map(c => cell(c, lang)).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  function verbs(lang, D){
    const T = window.CONJ_TENSES ? window.CONJ_TENSES(lang) : [];
    if (!T.length) return "";
    if (!tense || !T.some(t => t.id === tense)) tense = T[0].id;
    const tb = window.CONJ_TABLE(lang, tense), t = tb.t;
    let h = `<div class="exintro2"><b>Verbos</b><p>${D.verbNote}</p></div>
      <div class="estpills">${T.map(x => `<button type="button" class="estpill${x.id === tense ? " on" : ""}" data-t="${x.id}">${e(x.n)} <i>${x.lvl}</i></button>`).join("")}</div>
      <div class="exintro2"><b>${e(t.n)}</b><p>${t.r}</p></div>`;
    h += table(["Verbo", "Português"].concat(tb.head), tb.rows, lang);
    if (D.irr) h += `<details class="estdet"><summary>Verbos irregulares: infinitivo, passado e particípio (${D.irr.r.split("\n").length})</summary>${table(D.irr.h, rows(D.irr.r), lang)}</details>`;
    return h;
  }
  function sections(D, key, lang){
    return (D[key] || []).map((s, i) => {
      const note = s.note ? `<div class="exintro2"><p>${s.note}</p></div>` : "";
      if (!s.r) return `<div class="estsec"><h3>${e(s.n)}</h3>${note}</div>`;
      return `<details class="estdet" ${i < 2 ? "open" : ""}><summary>${e(s.n)} <i>${rows(s.r).length}</i></summary>${note}${table(s.h, rows(s.r), lang)}</details>`;
    }).join("");
  }
  function vocab(lang){
    if (typeof VTHEMES === "undefined") return "";
    const ci = {en:1, es:2, fr:3, ru:4, tr:5, ar:6}[lang], names = {en:"inglês", es:"espanhol", fr:"francês", ru:"russo", tr:"turco", ar:"árabe"};
    const th = Object.keys(VTHEMES).map(k => { const seen = new Set(), r = [];
      VTHEMES[k].rows.forEach(x => { const c = typeof x === "string" ? x.split("|") : x; if (c[ci] && !seen.has(c[ci])){ seen.add(c[ci]); r.push([c[ci], c[0]]); } });
      return {t: VTHEMES[k].t, r}; }).filter(x => x.r.length);
    const total = th.reduce((n, x) => n + x.r.length, 0);
    return `<div class="exintro2"><b>Vocabulário</b><p>Todas as palavras dos temas de vocabulário do app em ${names[lang]}, organizadas por tema: <b>${total}</b> palavras. Use a busca para achar uma palavra.</p></div>` +
      th.map((x, i) => `<details class="estdet" ${i === 0 ? "open" : ""}><summary>${e(x.t)} <i>${x.r.length}</i></summary>${table(["Palavra", "Português"], x.r, lang)}</details>`).join("");
  }
  function applyFilter(){
    const body = document.getElementById("estBody"); if (!body) return;
    const k = q.trim().toLowerCase();
    body.querySelectorAll("tbody tr").forEach(tr => { tr.hidden = !!k && !tr.textContent.toLowerCase().includes(k); });
    if (k) body.querySelectorAll("details.estdet").forEach(d => { const any = d.querySelector("tbody tr:not([hidden])"); d.open = !!any; d.hidden = !any; });
    else body.querySelectorAll("details.estdet").forEach(d => { d.hidden = false; });
  }
  function view(){
    const lang = S.lang, D = (window.EST_DATA || {})[lang]; if (!D) return;
    const tabs = document.getElementById("estTabs"), body = document.getElementById("estBody"), hd = document.getElementById("estHead");
    hd.textContent = {en:"Inglês", es:"Espanhol", fr:"Francês", ru:"Russo", tr:"Turco", ar:"Árabe"}[lang] || "";
    tabs.innerHTML = CATS.map(([k, n]) => `<button type="button" class="estpill${k === cat ? " on" : ""}" data-c="${k}">${n}</button>`).join("") +
      `<input type="search" id="estSearch" class="estsearch" placeholder="Buscar nesta lista…" value="${e(q)}">`;
    body.innerHTML = cat === "verbs" ? verbs(lang, D) : cat === "vocab" ? vocab(lang) : sections(D, cat, lang);
    tabs.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { cat = b.dataset.c; q = ""; view(); });
    body.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { tense = b.dataset.t; view(); });
    const s = document.getElementById("estSearch"); s.oninput = () => { q = s.value; applyFilter(); };
    applyFilter();
  }
  function openView(c){ if (c) { cat = c; q = ""; } document.getElementById("mainLayout").hidden = true; document.getElementById("estView").hidden = false; view(); window.scrollTo(0, 0); }
  function closeView(){ document.getElementById("estView").hidden = true; document.getElementById("mainLayout").hidden = false; renderAll(); }
  function card(){
    const el = document.getElementById("estCard"); if (!el) return;
    el.innerHTML = `<img class="estimg" alt="" src="${window.CATAPULT_IMG || ""}">
      <div class="eyebrow">Consulte</div><h2 class="cardt"><span class="ini">E</span>strutura da linguagem</h2>
      <p class="intro">Como cada idioma monta suas frases: todos os verbos conjugados por tempo, e as listas de substantivos, pronomes, adjetivos, artigos, advérbios, preposições e conjunções do idioma que você estuda. Escolha uma categoria.</p>
      <div class="estchips">${CATS.map(([k, n]) => `<button type="button" class="btng estchip" data-c="${k}">${n}</button>`).join("")}</div>`;
    el.querySelectorAll(".estchip").forEach(b => b.onclick = () => openView(b.dataset.c));
  }
  const bk = document.getElementById("estBack"); if (bk) bk.onclick = closeView;
  const orig = window.renderExIntro;
  window.renderExIntro = renderExIntro = function(){ orig.apply(this, arguments); card(); };
  window.openEstView = openView;
  card();
})();
BI_T["Estrutura da linguagem"] = ["Language structure", "Estructura del idioma", "Structure de la langue", "Строение языка", "Dilin yapısı", "بُنْيَةُ اللُّغَة"];
