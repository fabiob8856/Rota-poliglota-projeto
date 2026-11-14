/* ---------- bandeiras ---------- */
const FLAGS = {
  en:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#0A2A6B"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="11"/><path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="6"/></svg>`,
  es:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#C60B1E"/><rect y="10" width="60" height="20" fill="#FFC400"/></svg>`,
  fr:`<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#0055A4"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#EF4135"/></svg>`,
  ru:`<svg viewBox="0 0 60 40"><rect width="60" height="13.4" fill="#fff"/><rect y="13.3" width="60" height="13.4" fill="#0039A6"/><rect y="26.6" width="60" height="13.4" fill="#D52B1E"/></svg>`,
  ar:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#006C35"/><text x="30" y="19" text-anchor="middle" font-size="6" textLength="42" lengthAdjust="spacingAndGlyphs" font-weight="700" font-family="Amiri,'Noto Naskh Arabic',serif" fill="#fff" direction="rtl">لا إله إلا الله محمد رسول الله</text><path d="M12 28.5 L42 28.5 L44 27.2 L46 27.2 L46 29.8 L44 29.8 L42 28.5 M41 25.8 L41 31.2" fill="#fff" stroke="#fff" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  tr:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#E30A17"/><circle cx="22" cy="20" r="10" fill="#fff"/><circle cx="24.5" cy="20" r="8" fill="#E30A17"/><path d="M33 20l-7.8 2.5 4.8-6.6v8.2l-4.8-6.6z" fill="#fff" transform="rotate(-18 30 20)"/></svg>`
};

/* ---------- cabeçalho, idiomas e níveis ---------- */
function renderHead(){
  const C = CL(), p = P(), L = lvl(p.cfg.level), st = streak(), tot = totalDone();
  document.body.dataset.lang = S.lang;
  document.title = "Rota Poliglota · " + C.name;
  document.getElementById("flagbox").innerHTML = FLAGS[S.lang];
  document.getElementById("hLang").textContent = C.name;
  document.getElementById("hSub").textContent = C.sub;
  document.getElementById("stats").innerHTML = `
    <div class="stat"><small>Nível do idioma</small><b>${L.id}</b> <span>${esc(L.rank)}</span></div>
    <div class="stat"><small>Etapas feitas</small><b>${tot}</b> <span>de ${LEVELS.reduce((a,l)=>a+nStep(l.id),0)}</span></div>
    <div class="stat"><small>Sequência</small><b>${st}</b> <span>${st === 1 ? "dia" : "dias"} · recorde ${Math.max(st, bestStreak())}</span></div>`;
  const nav = document.getElementById("langs");
  nav.querySelectorAll(".lang").forEach(b => b.remove());
  LANG_ORDER.forEach(id => {
    const b = document.createElement("button");
    b.className = "lang"; b.type = "button"; b.setAttribute("aria-pressed", S.lang === id);
    b.innerHTML = FLAGS[id] + `<span>${esc(LANG[id].name)}</span>`;
    b.onclick = () => { if (S.lang === id) return; tmStop(); S.lang = id; pend = null; view = P().cfg.level; updateLog(); save(); renderConfig(); checkProgress(); renderAll(); };
    nav.appendChild(b);
  });
}
/* ---------- aviso antes de trocar de nível: sugere uma prova de nivelamento ---------- */
function askLevelChange(newLvl, onOk, onCancel){
  const p = P(), old = p.cfg.level;
  if (newLvl === old){ if (onCancel) onCancel(); return; }
  const test = S.lang === "en"
    ? {url:"https://www.efset.org/", lbl:"Fazer o teste EF SET (gratuito)"}
    : {url:"https://www.google.com/search?q=" + encodeURIComponent("teste de nivelamento " + CL().name + " gratuito"), lbl:"Procurar um teste de nível"};
  const ov = document.createElement("div");
  ov.className = "overlay"; ov.setAttribute("role","dialog"); ov.setAttribute("aria-modal","true"); ov.setAttribute("aria-labelledby","lvAskT");
  ov.innerHTML = `<div class="modalcard lvask"><div class="eyebrow">Antes de mudar de nível</div>
    <h2 class="cardt" id="lvAskT"><span class="ini">F</span>aça uma prova de nivelamento</h2>
    <p>Você está trocando de <b>${esc(old)}</b> para <b>${esc(newLvl)}</b>. Antes disso, vale fazer um teste de nível: ele mostra onde você realmente está e evita pular conteúdo que ainda não domina, ou repetir o que já sabe.</p>
    <p class="note">Faça o teste, anote a nota e só então mude. A nota do teste (A1 a C2) é o nível para escolher aqui.</p>
    <div class="lvaskbtns">
      <a class="btnp" href="${test.url}" target="_blank" rel="noopener">${esc(test.lbl)}</a>
      <button type="button" class="btng" id="lvAskGo">Mudar para ${esc(newLvl)} mesmo assim</button>
      <button type="button" class="btng" id="lvAskNo">Cancelar</button>
    </div></div>`;
  document.body.appendChild(ov);
  const close = ok => { document.removeEventListener("keydown", onKey); ov.remove(); if (ok) onOk(); else if (onCancel) onCancel(); };
  const onKey = e => { if (e.key === "Escape") close(false); };
  document.addEventListener("keydown", onKey);
  ov.querySelector("#lvAskGo").onclick = () => close(true);
  ov.querySelector("#lvAskNo").onclick = () => close(false);
  ov.addEventListener("click", e => { if (e.target === ov) close(false); });
  ov.querySelector("#lvAskNo").focus();
}
function renderRealms(){
  const nav = document.getElementById("realms"); nav.innerHTML = "";
  const p = P();
  LEVELS.forEach(L => {
    const b = document.createElement("button");
    b.className = "realm"; b.type = "button";
    b.setAttribute("aria-current", view === L.id);
    b.style.setProperty("--rc", LVCOL[L.id]);
    const byEx = typeof exBook === "function" && !!exBook(); // com livro de exercícios: barra = dias de exercícios; sem livro: etapas do mapa
    const nDays = byEx ? exDaysCount(p, L.id) : 0, tgt = byEx ? exDaysTarget(L.id, p) : nStep(L.id);
    const rawN = byEx ? nDays : doneCount(L.id), pct = rawN > 0 ? Math.max(6, Math.min(100, rawN / tgt * 100)) : 0; // mínimo de 6% para o 1º dia já aparecer
    const tip = byEx ? `${L.id}: ${nDays} de ${tgt} dias de exercícios` : `${L.id}: ${doneCount(L.id)} de ${nStep(L.id)} etapas`;
    b.title = tip;
    b.innerHTML = `<div class="shield"><i>${L.id}</i></div><div class="nm">${esc(L.name)}</div><div class="md">${esc(L.rank)}</div><div class="pb"><b style="width:${pct}%"></b></div>${byEx ? `<div class="pbt">${nDays}/${tgt} dias</div>` : ""}${p.cfg.level === L.id ? '<span class="you">você</span>' : ""}`;
    b.setAttribute("aria-label", `Mapa ${L.id}, ${L.name}${p.cfg.level === L.id ? ", seu nível atual" : ""}. ${tip}`);
    b.onclick = () => { view = L.id; pend = null; renderAll(); };
    nav.appendChild(b);
  });
}

/* ---------- Hoje ---------- */
const openQ = {};
function openStep(k){
  flowOpenStep(k, P().cfg.level);
}
function phBank(C, id){ return (C.phrasesBy && C.phrasesBy[id] && C.phrasesBy[id].length) ? C.phrasesBy[id] : C.phrases; }
function renderToday(){
  const el = document.getElementById("today"), p = P(), C = CL(), id = p.cfg.level, L = lvl(id), D = DAYS[NOW.getDay()];
  const focusId = document.activeElement && document.activeElement.id;
  const dstr = NOW.toLocaleDateString("pt-BR",{weekday:"long", day:"numeric", month:"long"});
  const start = new Date(p.cfg.start + "T00:00:00");
  const week = Math.max(1, Math.floor((dayNum(NOW) - dayNum(start))/7) + 1);
  const study = isStudy(NOW) || p.today.extra;
  const bank = phBank(C, view), ph = bank[((dayNum(NOW) % bank.length) + bank.length) % bank.length];
  let h = `<div class="eyebrow">Hoje · ${esc(dstr)}</div>
    <h2 class="cardt"><span class="ini">F</span>rase do dia</h2>
    ${(() => { const mb = (MOTIV[S.lang] || {})[id] || [], mv = mb.length ? mb[((dayNum(NOW) * 3 + 1) % mb.length + mb.length) % mb.length] : null; return mv ? `<div class="phrase"><small>${esc(C.name)}</small><b lang="${S.lang}">${esc(mv.p)}</b><span>${esc(mv.t)}</span>${mv.n ? `<em>${esc(mv.n)}</em>` : ""}</div>` : ""; })()}`;
  const dn = dayNum(NOW), ms = missionsFor(dn), pl0 = plan(id);
  const mainDone = pl0.filter(b=>p.today.done.includes(b.k)).length, extraDone = ms.filter(m => missionDone(m.id)).length;
  const flowMode = typeof flowOn === "function" && flowOn(p), exAvail = flowMode || (typeof exDailyAvailable === "function" && exDailyAvailable(p)), exN = exAvail ? exDailyN(p) : 0;
  const wrAvail = typeof wrAvailable === "function" && wrAvailable(), wrN = wrAvail ? wrDailyN(p) : 0;
  const duoM = duoDaily(dn), extraMs = ms;
  const todayGoal = pl0.length + 1 + ms.length + (exAvail ? 1 : 0) + (wrAvail ? 1 : 0), todayN = mainDone + (missionDone("d0") ? 1 : 0) + extraDone + (exN > 0 ? 1 : 0) + (wrN > 0 ? 1 : 0);
  const mon0 = new Date(NOW); mon0.setDate(mon0.getDate() - (NOW.getDay()+6)%7);
  let wkN = 0, wkGoal = 0;
  for (let i=0;i<7;i++){ const d = new Date(mon0); d.setDate(mon0.getDate()+i); const k = iso(d), isT = k === T;
    if (isStudy(d) || isT) wkGoal += isT ? todayGoal : pl0.length + 1 + missionsFor(dayNum(d)).length + (exAvail ? 1 : 0) + (wrAvail ? 1 : 0);
    if (isT) wkN += todayN;
    else { if (p.mlog[k]) { const ml = p.mlog[k]; wkN += ml.filter(x => mById(x) || x === "d0").length + (ml.some(x => /^ex_/.test(x)) ? 1 : 0) + (ml.some(x => /^wr_/.test(x)) ? 1 : 0); } if (p.log[k]) wkN += Math.min(pl0.length, Math.round(p.log[k].m / Math.max(5, mainBudget()/Math.max(1, pl0.length)))); } }
  const gl = (lbl, n, g) => `<div class="goal${n >= g ? " ok" : ""}"><small>${lbl}</small><b>${n}/${g}</b><div class="bar"><i style="width:${Math.min(100, n/g*100)}%"></i></div></div>`;
  h += `<div class="goals">${gl("Missões hoje", todayN, todayGoal)}${gl("Missões na semana", wkN, Math.max(1, wkGoal))}</div>`;
  const tb = timeBudget(), varMin = ms.reduce((a,m) => a + m.min, 0);
  const mrow = m => { const d = missionDone(m.id), tg = MTAG[m.tag];
    return `<li class="mi${d ? " done" : ""}" style="--mc:${tg[1]}"><input class="seal" type="checkbox" id="mi-${m.id}" data-m="${m.id}"${d ? " checked" : ""} aria-label="${esc(mText(m.t))}"><label for="mi-${m.id}"><span class="tag">${tg[0]}</span><i class="mmin">${m.min} min</i><b>${mTitleHtml(mText(m.t), m.id)}</b><span>${esc(mText(m.h))}</span></label>${m.url ? `<a class="btng mlinkbtn" href="${m.url}" target="_blank" rel="noopener">Abrir site</a>` : ""}</li>`; };
  let fx = "";
  {
    fx += `<div class="flbl" style="margin-top:16px">Missões fixas · todo dia · ${tb.F} min</div><ul class="mis">`;
    const duoRow = mrow(duoM);
    if (exAvail && flowMode){
      const cur = flowToday(), cs = cur ? lvData(id).steps[cur-1].t : "";
      const txt = exN > 0 ? "Sessão de hoje concluída. Volte amanhã para a próxima." : (cur ? `Etapa ${flowNum(id,cur)} do mapa: ${cs}. Uma sessão com 4 unidades; as trilhas se alternam e cada passo se conclui após as revisões (a cada 2 dias).` : "Nada liberado hoje: as próximas revisões voltam em 2 dias (ou o nível está concluído).");
      fx += `<li class="mi${exN>0 ? " done" : ""}" style="--mc:var(--p2)"><input class="seal" type="checkbox" tabindex="-1" style="pointer-events:none"${exN>0 ? " checked" : ""} aria-label="Etapa de hoje ${exN>0 ? "concluída" : "pendente"}"><label><span class="tag">Etapa</span><i class="mmin">${FIX_MIN.ex} min</i><b>${mTitleHtml("Etapa de hoje")}</b><span>${esc(txt)}</span></label><button type="button" class="${exN>0 ? "btng" : "btnp"}" id="exDailyBtn">${exN>0 ? "Ver etapa" : "Fazer agora"}</button></li>`;
    } else if (exAvail){
      const due = exDueUnits(exLevelUnits(exBook(), p), p).length;
      const txt = exN > 0 ? `Concluído hoje · ${exN>1 ? exN + " sessões" : "1 sessão"}. Quer fazer mais?` : `Uma sessão com 4 unidades sorteadas do seu nível${due ? ` (${due} para rever hoje)` : ""}.`;
      fx += `<li class="mi${exN>0 ? " done" : ""}" style="--mc:var(--p2)"><input class="seal" type="checkbox" tabindex="-1" style="pointer-events:none"${exN>0 ? " checked" : ""} aria-label="Exercícios do dia ${exN>0 ? "concluídos" : "pendentes"}"><label><span class="tag">Exercícios</span><i class="mmin">${FIX_MIN.ex} min</i><b>${mTitleHtml("Exercícios do dia")}</b><span>${esc(txt)}</span></label><button type="button" class="${exN>0 ? "btng" : "btnp"}" id="exDailyBtn">${exN>0 ? "Fazer mais exercícios" : "Fazer agora"}</button></li>`;
    }
    fx += duoRow;
    if (wrAvail){
      const txt = wrN > 0 ? `Concluído hoje · ${wrN>1 ? wrN + " páginas" : "1 página"}. Quer copiar outra?` : "Copie no caderno uma página do seu livro (PDF).";
      fx += `<li class="mi${wrN>0 ? " done" : ""}" style="--mc:${MTAG.esc[1]}"><input class="seal" type="checkbox" tabindex="-1" style="pointer-events:none"${wrN>0 ? " checked" : ""} aria-label="Escrita do dia ${wrN>0 ? "concluída" : "pendente"}"><label><span class="tag">Escrita</span><i class="mmin">${FIX_MIN.wr} min</i><b>${mTitleHtml("Escrita do dia")}</b><span>${esc(txt)}</span></label><button type="button" class="${wrN>0 ? "btng" : "btnp"}" id="wrDailyBtn">${wrN>0 ? "Copiar outra página" : "Fazer agora"}</button></li>`;
    }
    fx += `</ul>`;
  }
  if (!study) {
    h += `<div class="rest"><b>Hoje é dia de descanso</b> nos seus dias de estudo. Se quiser algo leve, faça uma missão abaixo ou veja um episódio de série com legenda no idioma.</div>
      <button class="btnp" type="button" id="extraBtn">Estudar hoje mesmo assim</button>${fx}`;
  } else {
    const pl = pl0, tot = pl.reduce((a,b)=>a+b.m,0);
    const dm = pl.filter(b=>p.today.done.includes(b.k)).reduce((a,b)=>a+b.m,0);
    h += `<div class="sesh"><b>${tb.B} min</b><span>Nível ${id} · ${esc(L.name)} · semana ${week}</span></div>
      <p class="note tbsplit">Seu tempo de hoje: fixas ${tb.F} min · principais ${tot} min · sorteadas ${varMin} min${tb.F + tot + varMin > tb.B ? ` (passa ${tb.F + tot + varMin - tb.B} min do seu tempo: aumente o tempo por dia em Configurações se quiser tudo)` : ""}.</p>
      <div class="mbar"><div class="bar"><i style="width:${tot ? dm/tot*100 : 0}%"></i></div><span>${dm} de ${tot} min</span></div>`;
    if (TM.k) {
      const bk = pl.find(b => b.k === TM.k);
      h += `<div class="timer${TM.over ? " over" : ""}"><b id="tmDisp">${fmtT(TM.left)}</b><span>${TM.over ? "Tempo esgotado. Missão marcada como feita." : esc(bk ? bk.t : "Cronômetro")}</span>
        ${TM.over ? "" : `<button class="tb" type="button" id="tmToggle">${TM.running ? "Pausar" : "Continuar"}</button>`}<button class="tb" type="button" id="tmStop">${TM.over ? "Fechar" : "Parar"}</button></div>`;
    }
    h += fx;
    h += `<div class="mhead"><div class="flbl">Missões principais, em ordem · ${tot} min</div><button type="button" class="btng mshufbtn" id="mshufBtn"><svg class="dice2" viewBox="0 0 48 34" width="44" height="31" aria-hidden="true"><defs><linearGradient id="dgA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6dcc3"/></linearGradient><linearGradient id="dgB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#e2d6b8"/></linearGradient></defs><ellipse cx="24" cy="31" rx="19" ry="2.4" fill="rgba(60,35,12,.22)"/><g transform="rotate(-14 14 18)"><rect x="3" y="6" width="20" height="20" rx="5.5" fill="url(#dgA)" stroke="#8c6a1e" stroke-width="1.5"/><path d="M7 8.5h12" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/><circle cx="9" cy="12.5" r="2" fill="#B8321F"/><circle cx="17" cy="12.5" r="2" fill="#B8321F"/><circle cx="13" cy="16" r="2" fill="#B8321F"/><circle cx="9" cy="19.5" r="2" fill="#B8321F"/><circle cx="17" cy="19.5" r="2" fill="#B8321F"/></g><g transform="rotate(12 33 15)"><rect x="23" y="3" width="20" height="20" rx="5.5" fill="url(#dgB)" stroke="#8c6a1e" stroke-width="1.5"/><path d="M27 5.5h12" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/><circle cx="29" cy="9.5" r="2" fill="#24377A"/><circle cx="37" cy="16.5" r="2" fill="#24377A"/><circle cx="33" cy="13" r="2" fill="#24377A"/></g><path d="M44 2l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" fill="#E7C766"/></svg> Embaralhar</button></div>
      <ol class="blocks">${pl.map((b, i) => {
        const d = p.today.done.includes(b.k), K = KIND[b.k];
        return `<li class="blk${d ? " done" : ""}" style="--tc:${K[1]}">
          <input class="seal" type="checkbox" id="blk-${b.k}" data-k="${b.k}"${d ? " checked" : ""} aria-label="Missão ${i+1} feita">
          <div class="coin"><b>${b.m}</b><small>MIN</small></div>
          <label class="bt" for="blk-${b.k}"><small>Missão ${i+1} · ${K[0]}</small><b>${mTitleHtml(b.t)}</b><span>${esc(b.h)}</span></label>
          <button class="play" type="button" data-k="${b.k}" data-m="${b.m}" title="Iniciar cronômetro de ${b.m} min" aria-label="Iniciar cronômetro de ${b.m} minutos"${d || TM.k === b.k ? " disabled" : ""}>▶</button></li>`; }).join("")}</ol>
      ${extraMs.length ? `<div class="msub">${mTitleHtml("Mais missões de hoje", null, " · " + varMin + " min")}</div><ul class="mis">${extraMs.map(mrow).join("")}</ul>` : ""}
      ${dm >= tot && tot > 0 ? `<div class="donemsg"><b>Missões principais cumpridas!</b>${tot} minutos de ${esc(C.name)} no nível ${id}. Volte amanhã para manter a sequência.</div>` : ""}`;
    if (D.focus) {
      const s = SUBJ[SIDX(D.focus)], k = nextOf(id, D.focus), Ld = lvData(id);
      h += k ? `<div class="maplink" style="--sc:${s.c}"><div><small>No fluxo hoje · ${esc(s.n)}</small><b>Etapa ${k}: ${esc(Ld.steps[k-1].t)}</b><span>Pronto quando: ${esc(Ld.steps[k-1].w)}</span></div><button class="btng" type="button" id="openStep" data-k="${k}">${typeof flowOn === "function" && flowOn(p) ? "Abrir etapa" : "Abrir no mapa"}</button></div>`
             : `<div class="maplink" style="--sc:${s.c}"><div><small>No fluxo hoje · ${esc(s.n)}</small><b>As etapas de ${esc(s.n)} deste nível já estão feitas.</b><span>Use o tempo para revisar ou avance em outra matéria.</span></div></div>`;
    } else {
      h += `<div class="maplink" style="--sc:var(--p1d)"><div><small>No fluxo hoje</small><b>Confirme as etapas que você cumpriu na semana.</b><span>Abra a etapa no fluxograma abaixo.</span></div></div>`;
    }
  }
  if (!study) h += `<div class="mhead"><div class="flbl">Missões sorteadas de hoje · ${varMin} min</div><button type="button" class="btng mshufbtn" id="mshufBtn"><svg class="dice2" viewBox="0 0 40 28" width="34" height="24" aria-hidden="true"><g transform="rotate(-12 12 15)"><rect x="2" y="5" width="18" height="18" rx="4.5" fill="#fffaf0" stroke="#8c6a1e" stroke-width="1.6"/><circle cx="7.5" cy="10.5" r="1.7" fill="#B8321F"/><circle cx="14.5" cy="10.5" r="1.7" fill="#B8321F"/><circle cx="11" cy="14" r="1.7" fill="#B8321F"/><circle cx="7.5" cy="17.5" r="1.7" fill="#B8321F"/><circle cx="14.5" cy="17.5" r="1.7" fill="#B8321F"/></g><g transform="rotate(10 29 14)"><rect x="20" y="3" width="18" height="18" rx="4.5" fill="#fffaf0" stroke="#8c6a1e" stroke-width="1.6"/><circle cx="25.5" cy="8.5" r="1.7" fill="#24377A"/><circle cx="32.5" cy="15.5" r="1.7" fill="#24377A"/><circle cx="29" cy="12" r="1.7" fill="#24377A"/></g></svg> Embaralhar</button></div>
    <ul class="mis">${extraMs.map(mrow).join("")}</ul>`;
  const qb = phBank(C, view), qs = [dn, dn-1, dn-3].map(x => ((x % qb.length) + qb.length) % qb.length);
  h += `<div class="train"><div class="flbl">Treino rápido · você lembra?</div>${qs.map((qi, i) => { const q = qb[qi], k = "q" + view + qi, done = missionDone(k), open = !!(openQ[k]);
    return `<div class="q"><div><b lang="${S.lang}">${esc(q.p)}</b><span>${open || done ? esc(q.t) : "Tente lembrar a tradução antes de mostrar."}</span></div>${done ? `<button type="button" disabled>Lembrou ✓</button>` : (open ? `<button type="button" data-q="${k}" class="qok">Lembrei</button>` : `<button type="button" data-q="${k}" class="qshow">Mostrar</button>`)}</div>`; }).join("")}</div>`;
  const mon = new Date(NOW); mon.setDate(mon.getDate() - (NOW.getDay()+6)%7);
  let cells = "";
  for (let i=0;i<7;i++){
    const d = new Date(mon); d.setDate(mon.getDate()+i);
    const k = iso(d), ok = !!p.log[k], st = isStudy(d), isT = k === T, past = k < T;
    const cls = ok ? "ok" : (!st ? "off" : (past ? "miss" : ""));
    cells += `<div class="wd ${cls}${isT ? " now" : ""}" title="${DAYS[d.getDay()].n}${ok ? ` · ${p.log[k].m} min` : ""}"><b>${DAYN[d.getDay()]}</b><span>${DAYS[d.getDay()].s}</span></div>`;
  }
  h += `<div class="flbl" style="margin-top:16px">Sua semana</div><div class="week">${cells}</div>
    <div class="legend"><span><i style="background:var(--p2);border-color:#6A160B"></i>estudou</span><span><i style="background:repeating-linear-gradient(45deg,transparent 0 3px,rgba(92,74,54,.4) 3px 4px)"></i>faltou</span><span><i style="border-style:dotted;opacity:.6"></i>descanso</span></div>`;
  el.innerHTML = h;
  el.querySelectorAll("input[data-k]").forEach(inp => inp.addEventListener("change", () => {
    const k = inp.dataset.k;
    if (inp.checked) { if (!p.today.done.includes(k)) p.today.done.push(k); if (TM.k === k) { clearInterval(TM.iv); TM = {k:null, total:0, left:0, running:false, iv:null, over:false}; } }
    else p.today.done = p.today.done.filter(x => x !== k);
    const all = plan(id).every(b => p.today.done.includes(b.k)); if (all && p.fullToday !== T) { p.fullToday = T; p.fullDays = (p.fullDays||0) + 1; }
    afterChange();
  }));
  el.querySelectorAll("input[data-m]").forEach(inp => inp.addEventListener("change", () => toggleMission(inp.dataset.m)));
  el.querySelectorAll(".qshow").forEach(b => b.onclick = () => { openQ[b.dataset.q] = true; renderToday(); });
  el.querySelectorAll(".qok").forEach(b => b.onclick = () => toggleMission(b.dataset.q));
  el.querySelectorAll(".play").forEach(b => b.onclick = () => tmStart(b.dataset.k, +b.dataset.m));
  const tt = document.getElementById("tmToggle"); if (tt) tt.onclick = tmToggle;
  const ts = document.getElementById("tmStop"); if (ts) ts.onclick = tmStop;
  const mb = document.getElementById("mshufBtn"); if (mb) mb.onclick = () => { mb.disabled = true; mshufSpin(() => { shuffleMissions(); if (study) shuffleMain(); updateLog(); afterChange(); toast("Missões trocadas. As concluídas foram mantidas."); }); };
  const eb = document.getElementById("extraBtn");
  if (eb) eb.onclick = () => { p.today.extra = true; save(); renderAll(); };
  const edb = document.getElementById("exDailyBtn"); if (edb) edb.onclick = (typeof flowOn === "function" && flowOn(p)) ? openStepToday : openExDaily;
  const wdb = document.getElementById("wrDailyBtn"); if (wdb) wdb.onclick = openWrDaily;
  const os = document.getElementById("openStep");
  if (os) os.onclick = () => openStep(+os.dataset.k);
  if (focusId) { const f = document.getElementById(focusId); if (f) f.focus(); }
}

/* ---------- clique nas moedas: 1º mostra, 2º confirma ---------- */
function onSpace(k){
  const p = P();
  if (pend && pend.lv === view && pend.k === k) {
    const key = sk(view, k), was = !!p.steps[key];
    if (was) delete p.steps[key]; else p.steps[key] = T;
    pend = null; hidePop();
    toast(was ? `Etapa ${k} desmarcada` : `Etapa ${k} confirmada!`);
    afterChange(); return;
  }
  pend = {lv:view, k};
  drawBoard(view); showPop(k);
}
function showPop(k){
  const s = subjOf(k), st = lvData(view).steps[k-1], done = isDone(view,k);
  const pop = document.getElementById("pop");
  pop.style.setProperty("--sc", s.c);
  pop.innerHTML = `<button class="x" type="button" aria-label="Fechar">×</button>
    <div class="eb">Etapa ${flowNum(view,k)} de ${nStep(view)} · ${esc(s.n)}</div>
    <h3>${esc(st.t)}</h3>
    ${done ? `<span class="status">Concluída</span>` : ""}
    <div class="lbl">O que fazer</div><ul>${st.d.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <div class="lbl">Pronto quando</div><p>${esc(st.w)}</p>
    <div class="act"><button class="${done ? "btng" : "btnp"}" type="button" id="popOk">${done ? "Desmarcar etapa" : "Confirmar etapa"}</button><span>ou clique de novo na moeda</span></div>`;
  pop.hidden = false;
  pop.querySelector(".x").onclick = () => { pend = null; hidePop(); drawBoard(view); };
  document.getElementById("popOk").onclick = () => onSpace(k);
  const inner = document.getElementById("boardInner"), W = inner.offsetWidth, H = inner.offsetHeight;
  const q = document.getElementById("board")._spaceAt(k), x = q.x/BW*W, y = q.y/BH*H;
  const pw = pop.offsetWidth, ph = pop.offsetHeight;
  const left = Math.min(Math.max(8, x - pw/2), W - pw - 8);
  let top = y > H/2 ? y - ph - 26 : y + 26;
  top = Math.min(Math.max(8, top), H - ph - 8);
  pop.style.left = left + "px"; pop.style.top = top + "px";
}
function hidePop(){ document.getElementById("pop").hidden = true; }
let toastT;
function toast(msg){
  const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1800);
}
document.getElementById("board").addEventListener("click", () => { if (pend) { pend = null; hidePop(); drawBoard(view); } });
document.addEventListener("keydown", e => { if (e.key === "Escape" && pend) { pend = null; hidePop(); drawBoard(view); } });

/* ---------- cabeçalho do mapa ---------- */
function renderBoardHead(){
  const p = P(), L = lvl(view), Ld = lvData(view), dc = doneCount(view);
  let html = "";
  if (view !== p.cfg.level) html += `<div class="notice"><span>Você está olhando o mapa <b>${view}</b>. Seu nível atual é o <b>${p.cfg.level}</b>; é nele que a sessão de hoje conta.</span><button class="btng" type="button" id="mkActive">Mudar meu nível para ${view}</button></div>`;
  else if (dc === nStep(view)) {
    const nx = LEVELS[LEVELS.findIndex(l=>l.id===view)+1];
    if (nx) html += `<div class="notice"><span>Todas as etapas do ${view} estão feitas!</span><button class="btnp" type="button" id="goNext">Seguir para o ${nx.id} · ${esc(nx.name)}</button></div>`;
  }
  html += `<div class="board-head"><div><h2>${L.id} · ${esc(L.name)}<small>${esc(CL().name)}</small></h2><p>${esc(Ld.story)}</p></div>
    <div class="bprog">${dc} de ${nStep(view)} etapas<div class="bar"><i style="width:${dc/nStep(view)*100}%"></i></div></div></div>`;
  const el = document.getElementById("boardHead"); el.innerHTML = html;
  const mk = document.getElementById("mkActive");
  if (mk) mk.onclick = () => askLevelChange(view, () => { p.cfg.level = view; updateLog(); save(); renderConfig(); renderAll(); });
  const gn = document.getElementById("goNext");
  if (gn) gn.onclick = () => { const nx = LEVELS[LEVELS.findIndex(l=>l.id===view)+1]; askLevelChange(nx.id, () => { p.cfg.level = nx.id; view = nx.id; pend = null; save(); renderConfig(); renderAll(); }); };
}

/* ---------- diário das etapas ---------- */
function renderSteps(){
  const Ld = lvData(view), L = lvl(view), el = document.getElementById("steps"), p = P(); if (!el) return;
  const focusId = document.activeElement && document.activeElement.id;
  el.innerHTML = `<div class="eyebrow">Diário das etapas · ${L.id} ${esc(L.name)}</div>
    <h2 class="cardt"><span class="ini">A</span>s ${nStep(view)} etapas do nível</h2>
    <div class="sgrid">${flowPlan(view).stages.flatMap(stg => stg.areas).map(ar => { const s = SUBJ[ar.g]; return `<div class="sgrp" style="--sc:${s.c}">
      <h4><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.5" fill="${s.c}"/><path d="${s.icon}" transform="translate(4.8 4.8) scale(.6)" fill="none" stroke="#FAF3E0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(ar.t || s.n)}</h4>
      ${ar.steps.map(k => { const st = Ld.steps[k-1], d = isDone(view,k), id = `st-${view}-${k}`;
        return `<label class="st${d ? " done" : ""}" for="${id}"><input class="seal" type="checkbox" id="${id}" data-k="${k}"${d ? " checked" : ""} disabled><div><strong><em>${flowNum(view,k)}.</em>${esc(st.t)}</strong><span>Pronto quando: ${esc(st.w)}</span></div></label>`; }).join("")}
    </div>`; }).join("")}</div>`;
  el.querySelectorAll("input[data-k]").forEach(inp => inp.addEventListener("change", () => {
    const k = +inp.dataset.k, key = sk(view, k);
    if (inp.checked) p.steps[key] = T; else delete p.steps[key];
    pend = null; hidePop(); afterChange();
  }));
  if (focusId) { const f = document.getElementById(focusId); if (f) f.focus(); }
}
