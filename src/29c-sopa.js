/* ---------- Sopa de letrinhas: arrastar/tocar nas letras para formar a palavra ---------- */
(function(){
  const strip = s => String(s).replace(/[ً-ٰٟ]/g, "");
  function pool(lang){
    const B = EX_BOOKS[lang]; if (!B) return [];
    const seen = {}, out = [];
    [].concat(B.units, B.vunits || []).forEach(u => (u.items || []).forEach(it => {
      if (it.t !== "text" || !it.a || !it.a.length) return;
      const w = strip(it.a[0]).trim();
      if (!/^[^\s.,;:!?¿¡'’\-]+$/.test(w)) return;
      const n = Array.from(w).length; if (n < 4 || n > 9 || seen[w.toLowerCase()]) return;
      const parts = String(it.q || "").split(/\s+—\s+/), pt = (parts[1] || "").trim(), fr = (parts[0] || "").replace(/^Complete:\s*/, "").replace(/_+/g, "___");
      if (!pt) return;
      seen[w.toLowerCase()] = 1; out.push({w, hint: pt + "  (" + fr + ")"});
    }));
    return out;
  }
  const rnd = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  function pick(lang, n, seed){
    const p = pool(lang), r = rnd(seed), a = p.slice();
    for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a.slice(0, n);
  }
  function shuffled(w, r){
    const L = Array.from(w); let s = L.slice(), tries = 0;
    do { for (let i = s.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; } } while (s.join("") === L.join("") && ++tries < 9);
    return s;
  }
  function mount(host, force){
    if (!force && typeof exStepMode !== "undefined" && exStepMode) return;
    const old = host.querySelector("#sopaBlock"); if (old) old.remove();
    const lang = S.lang, seed = (parseInt(String(T).replace(/\D/g, "")) || 1) * 13 + (LANG_ORDER.indexOf(lang) + 1) * 101 + (Date.now() % 7 === 99 ? 1 : 0);
    const words = pick(lang, 5, seed + (window._sopaSalt || 0));
    if (!words.length) return;
    const rtl = lang === "ar", r = rnd(seed + 7);
    const box = document.createElement("div"); box.className = "sopa"; box.id = "sopaBlock";
    box.innerHTML = `<h3>🔤 Sopa de letrinhas</h3>
      <div class="exexpl"><div class="exintro2"><b>Como funciona</b><p>As letras de cada palavra estão embaralhadas. Arraste uma letra para cima de outra (ou toque em duas letras) para trocá-las de lugar até formar a palavra do idioma que você estuda. A dica em português mostra o sentido.</p></div></div>` +
      words.map((x, i) => `<div class="sopaw" data-i="${i}"><div class="sopah">${esc(x.hint)}</div><div class="sopat" ${rtl ? 'dir="rtl"' : ""}>${shuffled(x.w, r).map(c => `<span class="sopal">${esc(c)}</span>`).join("")}</div><div class="sopar"></div></div>`).join("") +
      `<button type="button" class="btnp" id="sopaCheck">Conferir</button> <button type="button" class="btng" id="sopaNew">Outras palavras</button> <span id="sopaMsg" class="note"></span>`;
    host.appendChild(box);
    box.querySelector("#sopaNew").onclick = () => { window._sopaSalt = (window._sopaSalt || 0) + 1; mount(host, force); };
    const done = new Set(); let sel = null;
    box.querySelectorAll(".sopat").forEach(row => {
      const swap = (a, b) => { if (a === b) return; const ph = document.createElement("span"); row.replaceChild(ph, a); row.replaceChild(a, b); row.replaceChild(b, ph); };
      let drag = null;
      row.addEventListener("pointerdown", e => { const t = e.target.closest(".sopal"); if (!t || row.dataset.ok) return; drag = {t, moved: false}; t.classList.add("sel"); try { row.setPointerCapture(e.pointerId); } catch(_){} });
      row.addEventListener("pointermove", e => { if (!drag) return; const o = document.elementFromPoint(e.clientX, e.clientY), t = o && o.closest && o.closest(".sopal");
        if (t && t !== drag.t && row.contains(t)){ swap(drag.t, t); drag.moved = true; } });
      row.addEventListener("pointerup", () => { if (!drag) return; const t = drag.t; t.classList.remove("sel");
        if (!drag.moved){ if (sel && sel !== t && row.contains(sel)){ swap(sel, t); sel.classList.remove("sel"); sel = null; } else if (sel === t){ sel = null; } else { if (sel) sel.classList.remove("sel"); sel = t; t.classList.add("sel"); } }
        else if (sel){ sel.classList.remove("sel"); sel = null; }
        drag = null; });
    });
    box.querySelector("#sopaCheck").onclick = () => {
      box.querySelectorAll(".sopaw").forEach(w => { const i = +w.dataset.i, row = w.querySelector(".sopat"), res = w.querySelector(".sopar");
        const cur = Array.from(row.children).map(c => c.textContent).join(""), ok = cur === Array.from(words[i].w).join("");
        if (ok){ done.add(i); row.dataset.ok = 1; row.classList.add("good"); res.textContent = "✓ Correto!"; }
        else { res.textContent = "Ainda não — continue trocando as letras."; row.classList.remove("good"); } });
      const msg = box.querySelector("#sopaMsg");
      if (done.size === words.length){
        msg.textContent = "Sopa completa! Missão do dia marcada.";
        const ml = mlogToday(); if (!ml.includes("sp1")){ ml.push("sp1"); updateLog(); save(); checkProgress(); }
      } else msg.textContent = `${done.size}/${words.length} palavras certas.`;
    };
  }
  window.SOPA = {mount, pool};
  /* bloco na tela principal (igual ao de Exercícios) + tela própria com rodadas infinitas */
  let round = 0;
  function view(){
    const host = document.getElementById("sopaBody"); if (!host) return;
    window._sopaSalt = round * 3 + (round ? 17 : 0);
    host.innerHTML = ""; mount(host, true);
    const hd = document.getElementById("sopaHead"); if (hd) hd.textContent = "Rodada " + (round + 1);
    const box = host.querySelector("#sopaBlock"); if (!box) return;
    const nb = box.querySelector("#sopaNew"); if (nb){ nb.textContent = "Próxima rodada ➜"; nb.onclick = () => { round++; view(); window.scrollTo(0, 0); }; }
    const h3 = box.querySelector("h3"); if (h3) h3.remove();
  }
  function openView(){ round = 0; document.getElementById("mainLayout").hidden = true; document.getElementById("sopaView").hidden = false; view(); window.scrollTo(0, 0); }
  function closeView(){ document.getElementById("sopaView").hidden = true; document.getElementById("mainLayout").hidden = false; renderAll(); }
  function card(){
    const el = document.getElementById("sopaCard"); if (!el) return;
    const n = pool(S.lang).length;
    el.innerHTML = `<div class="eyebrow">Pratique</div><h2 class="cardt"><span class="ini">S</span>opa de letrinhas</h2>
      <p class="intro">Palavras do idioma que você estuda com as letras fora de ordem. Arraste as letras (ou toque em duas) para formar a palavra certa. Cada rodada traz 5 palavras novas, e você pode seguir rodada após rodada, sem fim. Terminar uma rodada marca a missão "sopa de letrinhas" do dia.</p>
      <div class="exintrostat">${n} palavras disponíveis neste idioma</div>
      <button type="button" class="btnp" id="sopaStart"${n ? "" : " disabled"}>Começar sopa de letrinhas</button>`;
    const b = document.getElementById("sopaStart"); if (b) b.onclick = openView;
  }
  const bk = document.getElementById("sopaBack"); if (bk) bk.onclick = closeView;
  const orig = window.renderExIntro;
  window.renderExIntro = renderExIntro = function(){ orig.apply(this, arguments); card(); };
  window.openSopaView = openView;
  card();
})();
BI_T["Sopa de letrinhas"] = ["Letter scramble", "Letras revueltas", "Lettres mélangées", "Анаграммы", "Harf karmaşası", "تَرْتِيبُ الْحُرُوف"];
