updateLog();
{ const p = P(); if (!p.achInit) { for (const a of ACH) if (a.ok(p)) p.ach[a.id] = p.ach[a.id] || T; p.achInit = true; save(); } }
renderConfig();
renderAll();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { drawBoard(view); if (pend) showPop(pend.k); });

/* ---------- modal de configurações ---------- */
(() => {
  const ov = document.getElementById("setOverlay"), btn = document.getElementById("gearBtn"), close = document.getElementById("setClose");
  const open = () => { ov.hidden = false; close.focus(); };
  const shut = () => { ov.hidden = true; btn.focus(); };
  btn.onclick = open;
  close.onclick = shut;
  ov.addEventListener("click", e => { if (e.target.id === "setOverlay") shut(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !ov.hidden) shut(); });
})();

/* ---------- dias de exercícios: aproveita o histórico que já existe (1x) ---------- */
{
  const p = P();
  if (!p.exDaysInit){
    const book = typeof exBook === "function" ? exBook() : null;
    if (book){
      const lvOf = {}; book.units.concat(book.vunits || []).forEach(u => lvOf[u.id] = u.lvl);
      const perDay = {}; // nível → data → unidades
      Object.keys(p.exlog || {}).forEach(k => { const u = k.split("_")[0], lv = lvOf[u], d = p.exlog[k].t; if (!lv || !d) return;
        ((perDay[lv] = perDay[lv] || {})[d] = (perDay[lv][d] || new Set())).add(u); });
      Object.keys(perDay).forEach(lv => { const ds = Object.keys(perDay[lv]).filter(d => perDay[lv][d].size >= 4).sort();
        if (ds.length) p.exDays[lv] = Array.from(new Set((p.exDays[lv] || []).concat(ds))).sort(); });
      if (p.exDaily && p.exDaily.date === T && p.exDaily.n > 0) exMarkDay(p);
    }
    p.exDaysInit = true; save();
  }
}

/* ---------- página de exercícios ---------- */
(() => {
  document.getElementById("exBack").onclick = closeExView;
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !document.getElementById("exView").hidden) closeExView(); });
  renderExIntro();
})();

/* ---------- página de escrita ---------- */
(() => {
  document.getElementById("wrBack").onclick = closeWrView;
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !document.getElementById("wrView").hidden) closeWrView(); });
  renderWrIntro();
  document.getElementById("tdBack").onclick = closeTdView;
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !document.getElementById("tdView").hidden) closeTdView(); });
  renderTdIntro();
})();

/* ---------- página de revisão ---------- */
(() => {
  document.getElementById("revBack").onclick = closeRevView;
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !document.getElementById("revView").hidden) closeRevView(); });
  renderRevIntro();
})();

(() => {
  document.getElementById("stBack").onclick = closeStepView;
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !document.getElementById("stepView").hidden) closeStepView(); });
})();

/* ---------- virada do dia: às 00:00 as missões e o card Hoje se renovam sozinhos ---------- */
(() => {
  const check = () => { if (refreshDay()){ try { P(); save(); } catch (e) {} if (typeof tmStop === "function") { try { tmStop(); } catch (e) {} } renderAll(); } };
  setInterval(check, 15000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) check(); });
  window.addEventListener("focus", check);
  window.addEventListener("pageshow", check);
})();
</script>
