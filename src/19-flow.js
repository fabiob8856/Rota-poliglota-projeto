/* ---------- fluxograma das etapas: cada etapa leva vários dias (sessões de 4 unidades sorteadas) ---------- */
const STEPU = {}; // STEPU[idioma][nível][k] = {vid:"busca no YouTube", units:[{id,title,lead?,expl?,items:[...]}]}
const FLOW_PER = 4, FLOW_GAP = 2; // sessão de 4 unidades; uma revisão só conta 2 dias depois da anterior
const FLOW_REV_BASE = {en:5, es:5, fr:6, tr:7, ru:8, ar:9}, FLOW_REV_LV = {A1:0, A2:0, B1:1, B2:2, C1:2, C2:3};
const flowRevs = lvl => (FLOW_REV_BASE[S.lang] || 6) + (FLOW_REV_LV[lvl] || 0); // revisões exigidas para concluir a etapa
const flowNeed = lvl => flowRevs(lvl) + 1; // 1ª sessão + revisões
const flowDue = r => r.last ? addDays(r.last, FLOW_GAP) : "";
const flowCanCount = r => !r.last || T >= flowDue(r);
function flowCountDay(p,lvl,k){ // registra uma sessão válida; conclui sozinha ao atingir o nº de revisões
  const rec = flowRecW(p,lvl,k); if (!flowCanCount(rec)) return false;
  if (!rec.days.includes(T)) rec.days.push(T); rec.last = T;
  if (rec.days.length >= flowNeed(lvl) && !isDone(lvl,k)){ p.steps[sk(lvl,k)] = T; rec.status = "done"; rec.due = ""; rec.revs = (rec.revs||0)+1; return "done"; }
  return true;
}
const flowProgTxt = (lvl,r) => r.days.length ? `${Math.min(r.days.length-1, flowRevs(lvl))} de ${flowRevs(lvl)} revisões` : `0 de ${flowRevs(lvl)} revisões · comece hoje`;
const FLOW_STAGES = [[0,1],[2,3],[4,5,6],[7]]; // índices de SUBJ por fase do fluxo
const FLOW_NAMES = ["1 · Fundamentos","2 · Entender","3 · Praticar","4 · Prova do nível"];
const FLOW_SUB = ["pronúncia e vocabulário podem andar juntos","","fala, leitura e escrita podem andar juntas",""];
const flowHas = lvl => !!(STEPU[S.lang] && STEPU[S.lang][lvl]);
const flowContent = (lvl,k) => (STEPU[S.lang] && STEPU[S.lang][lvl] && STEPU[S.lang][lvl][k]) || null;
const flowRec = (p,lvl,k) => (p.flow && p.flow[sk(lvl,k)]) || {days:[], seen:{}, last:"", status:"", due:"", revs:0};
function flowRecW(p,lvl,k){ if (!p.flow) p.flow = {}; const key = sk(lvl,k); if (!p.flow[key]) p.flow[key] = {days:[], seen:{}, last:"", status:"", due:"", revs:0}; return p.flow[key]; }
const FLOW_DEF = {stages: FLOW_STAGES.map((grp,i) => ({n:FLOW_NAMES[i], sub:FLOW_SUB[i], areas:grp.map(g => ({g, steps:[2*g+1,2*g+2]}))}))};
const FLOW_PLAN = {}; // FLOW_PLAN[nível] = {stages:[{n,sub,areas:[{g, t?, steps:[k...]}]}]}  (k = identificador estável da etapa)
const flowPlan = lvl => FLOW_PLAN[S.lang + ":" + lvl] || FLOW_PLAN[lvl] || FLOW_DEF;
const flowAll = lvl => flowPlan(lvl).stages.flatMap(s => s.areas.flatMap(a => a.steps));
const nStep = lvl => lvl ? flowAll(lvl).length : NSTEP;
function flowLoc(lvl,k){ const pl = flowPlan(lvl); let num = 0;
  for (let si=0; si<pl.stages.length; si++) for (const a of pl.stages[si].areas){ const i = a.steps.indexOf(k); if (i >= 0) return {si, area:a, idx:i, num: num+i+1}; num += a.steps.length; }
  return {si:0, area:pl.stages[0].areas[0], idx:0, num:k}; }
const flowNum = (lvl,k) => flowLoc(lvl,k).num;
const flowSubj = (lvl,k) => SUBJ[flowLoc(lvl,k).area.g];
const flowAreaName = (lvl,k) => { const a = flowLoc(lvl,k).area; return a.t || SUBJ[a.g].n; };
const flowDM = d => d ? d.slice(8) + "/" + d.slice(5,7) : "";
/* estado: done | rev (revisão vencida) | next (liberada) | lock | free (nível ainda sem conteúdo do fluxo) */
function flowState(lvl,k){
  const p = P();
  if (isDone(lvl,k)){ const r = flowRec(p,lvl,k); return (r.status === "rev" && r.due && r.due <= T) ? "rev" : "done"; }
  const loc = flowLoc(lvl,k), pl = flowPlan(lvl);
  if (!flowHas(lvl)){
    if (loc.si > 0) for (const a of pl.stages[loc.si-1].areas) for (const kk of a.steps) if (!isDone(lvl,kk)) return "lock";
    if (loc.idx > 0 && !isDone(lvl, loc.area.steps[loc.idx-1])) return "lock";
    return "next";
  }
  /* trilhas em paralelo: o 1º passo de cada trilha abre desde o início; o próximo só depois de concluir o anterior (com as revisões); a Prova abre quando todas as trilhas acabam */
  if (loc.area.g === 7){ for (const a of pl.stages.flatMap(x => x.areas)) if (a.g !== 7) for (const kk of a.steps) if (!isDone(lvl,kk)) return "lock"; }
  if (loc.idx > 0 && !isDone(lvl, loc.area.steps[loc.idx-1])) return "lock";
  const r = flowRec(p,lvl,k);
  return flowCanCount(r) ? "next" : "wait";
}
function flowCurrent(lvl){ const out = []; for (const k of flowAll(lvl)){ const s = flowState(lvl,k); if (s === "next" || s === "rev") out.push(k); } return out; }
function flowToday(){ const p = P(), lvl = p.cfg.level, cur = flowCurrent(lvl).filter(k => flowRec(p,lvl,k).last !== T); if (!cur.length) return 0;
  return cur.map((k,i) => ({k,i,l:flowRec(p,lvl,k).last || "0"})).sort((a,b) => a.l < b.l ? -1 : a.l > b.l ? 1 : a.i - b.i)[0].k; }
function openStepToday(){ const k = flowToday(); if (k) flowOpenStep(k, P().cfg.level); }
const flowOn = p => flowHas(p.cfg.level);

/* ---------- o fluxograma ---------- */
function renderFlow(){
  const el = document.getElementById("flow"); if (!el) return;
  const p = P(), lvl = view, Ld = lvData(lvl), has = flowHas(lvl);
  const stepBtn = k => {
    const st = Ld.steps[k-1], state = flowState(lvl,k), r = flowRec(p,lvl,k), n = r.days.length;
    const today = state === "wait" && r.last === T;
    const sym = state === "done" || today ? "✓" : state === "rev" ? "↻" : flowNum(lvl,k);
    let sub = "";
    if (state === "done") sub = r.status === "rev" && r.due ? "Revisão em " + flowDM(r.due) : "Concluída";
    else if (state === "rev") sub = "Hora de revisar";
    else if (state === "lock") sub = flowLoc(lvl,k).area.g === 7 ? "Abre quando as trilhas acabarem" : "Bloqueada";
    else if (state === "next") sub = n ? `Hora de revisar · ${n-1} de ${flowRevs(lvl)}` : "Começar";
    else if (state === "wait") sub = `${r.last === T ? "Feito hoje · " : ""}${n-1} de ${flowRevs(lvl)} revisões · volta ${flowDM(flowDue(r))}`;
    const cls = state === "next" && n > 0 ? "rev" : state;
    return `<button type="button" class="fst ${cls}${today ? " dtoday" : ""}" data-k="${k}" aria-label="Etapa ${flowNum(lvl,k)}: ${esc(st.t)}. ${esc(sub)}"><span class="fn">${sym}</span><span class="ft"><b>${esc(st.t)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</span></button>`;
  };
  const area = ar => {
    const s = SUBJ[ar.g], ks = ar.steps, d = ks.filter(k => isDone(lvl,k)).length;
    return `<div class="farea${ks.length > 2 ? " many" : ""}" style="--sc:${s.c}"><h3><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.5" fill="${s.c}"/><path d="${s.icon}" transform="translate(4.8 4.8) scale(.6)" fill="none" stroke="#FAF3E0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(ar.t || s.n)}<small>${d}/${ks.length}</small></h3>
      <div class="fsteps">${ks.map((k,i) => (i ? `<span class="farr" aria-hidden="true">→</span>` : "") + stepBtn(k)).join("")}</div></div>`;
  };
  const allAreas = flowPlan(lvl).stages.flatMap(x => x.areas);
  const par = allAreas.filter(a => a.g !== 7).sort((a,b) => a.g - b.g), prova = allAreas.filter(a => a.g === 7);
  let h = `<div class="fbanner">Rota do nível ${esc(lvl)}</div><p class="fintro">${has ? (window.immI ? immI("rota", {n: flowRevs(lvl), g: FLOW_GAP}, "") || null : null) || `As trilhas andam <b>em paralelo</b>: o 1º passo de cada uma já está aberto. O passo seguinte de uma trilha só abre quando o anterior for concluído, e cada passo se conclui depois de <b>${flowRevs(lvl)} revisões</b>, uma a cada <b>${FLOW_GAP} dias</b>. A Prova do nível abre quando todas as trilhas acabarem.` : (window.immI && immI("flow", {}, "")) || `Siga o fluxo de cima para baixo: cada etapa só libera depois de concluir a anterior. Clique numa etapa, faça as atividades e confirme. Você escolhe se conclui de vez ou revisa depois de quantos dias quiser.`}</p>
    <div class="flegend"><span><i class="done"></i>concluída</span><span><i class="next"></i>liberada</span><span><i class="rev"></i>revisar</span><span><i class="wait"></i>aguardando 2 dias</span><span><i class="lock"></i>bloqueada</span></div>
    <div class="fstart">${knightSvg(FLAGS[S.lang]||FLAGS.en,S.lang)}<span>⚑ Início do nível ${esc(lvl)}</span></div><div class="fdown" aria-hidden="true">↓</div>`;
  if (has){
    h += `<div class="fstage"><div class="flbl2">Trilhas em paralelo <em>· comece pelo 1º passo de cada uma</em></div><div class="frow par">${par.map(area).join("")}</div></div><div class="fdown" aria-hidden="true">↓</div>`;
    if (prova.length) h += `<div class="fstage"><div class="flbl2">Prova do nível</div><div class="frow">${prova.map(area).join("")}</div></div><div class="fdown" aria-hidden="true">↓</div>`;
  } else flowPlan(lvl).stages.forEach(stg => {
    h += `<div class="fstage"><div class="flbl2">${stg.n}${stg.sub ? ` <em>· ${stg.sub}</em>` : ""}</div><div class="frow">${stg.areas.map(area).join("")}</div></div><div class="fdown" aria-hidden="true">↓</div>`;
  });
  h += `<div class="fend">🏁 Nível concluído${lvl !== "C2" ? " · seguir para o próximo" : ""}</div>`;
  el.innerHTML = h;
  el.querySelectorAll(".fst").forEach(b => b.onclick = () => flowOpenStep(+b.dataset.k, lvl));
}

/* ---------- tela de uma etapa ---------- */
let stCtx = null, stSession = [], stExtra = false;
function flowOpenStep(k, lvl){
  stCtx = {k, lvl: lvl || view, lang: S.lang}; stConfirm = false; stChk = []; stSession = []; stExtra = false; exAns = {}; exGraded = {}; exStepMode = {onUnit: stOnUnit};
  document.getElementById("mainLayout").hidden = true; document.getElementById("stepView").hidden = false;
  renderStep(); window.scrollTo({top:0, behavior:"instant" in window ? "instant" : "auto"});
}
function closeStepView(){
  exStepMode = null; stCtx = null; stSession = [];
  document.getElementById("stepView").hidden = true; document.getElementById("mainLayout").hidden = false; renderAll();
}
function stPick(cont, rec){
  const seen = rec.seen || {}, arr = exShuffle(cont.units);
  arr.sort((a,b) => (seen[a.id] || 0) - (seen[b.id] || 0));
  return arr.slice(0, FLOW_PER);
}
function stOnUnit(u){
  if (!stSession.length || !stSession.every(x => exGraded[x.id])) return;
  const p = P(), {k,lvl} = stCtx;
  if (!stExtra){
    const rec = flowRecW(p,lvl,k), res = flowCountDay(p,lvl,k);
    if (res){ stSession.forEach(x => { rec.seen[x.id] = (rec.seen[x.id] || 0) + 1; }); p.exDaily = {date:T, n: exDailyN(p) + 1}; exMarkDay(p); }
    if (res === "done"){ toast(`Etapa ${flowNum(lvl,k)} concluída! A próxima da trilha foi liberada.`); updateLog(); save(); checkProgress(); renderRealms(); renderStep(); return; }
  }
  updateLog(); save(); renderRealms(); renderStep();
  const pn = document.getElementById("stDone"); if (pn) pn.scrollIntoView({block:"center", behavior:"smooth"});
}
function stConclude(mode){
  const p = P(), {k,lvl} = stCtx, rec = flowRecW(p,lvl,k);
  p.steps[sk(lvl,k)] = T; rec.status = mode ? "rev" : "done"; rec.due = mode ? addDays(T, mode) : ""; rec.revs = (rec.revs || 0) + 1;
  stSession = []; exAns = {}; exGraded = {};
  toast(mode ? `Etapa ${flowNum(lvl,k)} feita · revisão em ${flowDM(rec.due)}` : `Etapa ${flowNum(lvl,k)} concluída!`);
  afterChange(); closeStepView(); window.scrollTo({top:0});
}
function renderStep(){
  const body = document.getElementById("stepBody"), head = document.getElementById("stepHead"); if (!body || !stCtx) return;
  const p = P(), {k,lvl} = stCtx, Ld = lvData(lvl), st = Ld.steps[k-1], s = flowSubj(lvl,k), state = flowState(lvl,k), cont = flowContent(lvl,k), rec = flowRec(p,lvl,k);
  const days = rec.days.length;
  if (head && !flowTask(lvl,k)) head.textContent = cont && state !== "done" && state !== "free" ? flowProgTxt(lvl,rec) : "";
  let h = `<div class="eyebrow">Etapa ${flowNum(lvl,k)} de ${nStep(lvl)} · ${esc(flowAreaName(lvl,k))} · ${esc(lvl)}</div><h2 class="cardt">${esc(st.t)}</h2>
    <div class="stinfo" style="--sc:${s.c}"><div class="lbl">O que fazer</div><ul>${st.d.map(x => `<li>${esc(x)}</li>`).join("")}</ul><div class="lbl">Pronto quando</div><p>${esc(st.w)}</p></div>`;
  const task = flowTask(lvl,k);
  if (task){
    const hh = `<div class="eyebrow">Etapa ${flowNum(lvl,k)} de ${nStep(lvl)} · ${esc(flowAreaName(lvl,k))} · ${esc(lvl)}</div><h2 class="cardt">${esc(st.t)}</h2>
    <div class="stinfo" style="--sc:${s.c}"><div class="lbl">O que fazer</div><p>${esc(task.what)}</p></div>`;
    renderTaskStep(hh, task, body, head); return; }
  if (!cont){
    if (state === "lock"){ body.innerHTML = h + `<div class="stpanel"><b>Etapa ainda bloqueada.</b><p class="note">Conclua as etapas anteriores do fluxograma para liberar esta.</p></div>`; return; }
    if (state === "done"){
      h += `<div class="stpanel stok"><b>✓ Etapa concluída</b><p class="note">${rec.status === "rev" && rec.due ? `Revisão marcada para ${flowDM(rec.due)}. Nesse dia ela volta como "Hora de revisar".` : "Você marcou esta etapa como concluída definitivamente."}</p><div class="exchoice"><button type="button" class="btng exchoicebtn" id="stUndo">Desmarcar etapa</button></div></div>`;
    } else {
      h += `<div class="stpanel"><b>${state === "rev" ? "Hora de revisar" : "Quando terminar as atividades"}</b><p class="note">${state === "rev" ? "Revise esta etapa e escolha o que fazer agora:" : "Escolha se conclui de vez ou quando quer revisar:"}</p>${choiceHtml()}</div>`;
    }
    if (state !== "lock" && !task) h = h.replace(/(<div class="stpanel)/, kitHtmlPlaceholder => stKitHtml(lvl, k, st) + kitHtmlPlaceholder);
    body.innerHTML = h; if (state !== "lock") stKitWire(body);
    const un = document.getElementById("stUndo"); if (un) un.onclick = () => { delete p.steps[sk(lvl,k)]; const r = flowRecW(p,lvl,k); r.status = ""; r.due = ""; afterChange(); renderStep(); };
    body.querySelectorAll("[data-conc]").forEach(b => b.onclick = () => stConclude(+b.dataset.conc));
    body.querySelectorAll("[data-concc]").forEach(b => b.onclick = () => { const n = Math.round(+(body.querySelector(".stcn") || {}).value); if (n >= 1 && n <= 365) stConclude(n); else toast("Digite de 1 a 365 dias."); });
    return;
  }
  const seenN = cont.units.filter(u => rec.seen && rec.seen[u.id]).length;
  h += `<div class="stpanel"><div class="stprog"><b>${flowProgTxt(lvl,rec)}</b><div class="bar"><i style="width:${Math.min(100, days/flowNeed(lvl)*100)}%"></i></div><small>Cada revisão conta 2 dias depois da anterior. Você já viu ${seenN} das ${cont.units.length} unidades deste tema.</small></div>
    <a class="btng stvid" href="https://www.youtube.com/results?search_query=${encodeURIComponent(cont.vid)}" target="_blank" rel="noopener"><svg class="ytic" viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="5" fill="#e62117"/><path d="M11 5.5v9l8-4.5z" fill="#fff"/></svg> Ver vídeos sobre o tema no YouTube</a></div>`;
  if (state === "lock"){
    h += `<div class="stpanel"><b>Etapa ainda bloqueada.</b><p class="note">Conclua as etapas anteriores do fluxograma para liberar esta.</p></div>`;
    body.innerHTML = h; return;
  }
  const doneToday = !stExtra && state === "wait";
  const sessionOpen = stSession.length > 0;
  const allGraded = sessionOpen && stSession.every(u => exGraded[u.id]);
  if (state === "done" && !sessionOpen){
    h += `<div class="stpanel stok"><b>✓ Etapa concluída</b><p class="note">${rec.status === "rev" && rec.due ? `Revisão marcada para ${flowDM(rec.due)}. Nesse dia ela volta como "Hora de revisar".` : `Você fez as ${flowRevs(lvl)} revisões. A próxima etapa da trilha está liberada.`}</p>
      <div class="exchoice"><button type="button" class="btnp exchoicebtn" id="stExtraBtn">Fazer uma sessão extra</button><button type="button" class="btng exchoicebtn" id="stUndo">Desmarcar etapa</button></div></div>`;
  } else if (doneToday && !sessionOpen){
    h += `<div class="stpanel stok"><b>${rec.last === T ? "✓ Sessão de hoje concluída" : "Próxima revisão ainda não liberou"}</b><p class="note">Revisão ${days-1} de ${flowRevs(lvl)} feita. A próxima libera em ${flowDM(flowDue(rec))} (a cada ${FLOW_GAP} dias). Enquanto isso, siga as outras trilhas.</p></div>`;
    h += `<div class="stpanel"><button type="button" class="btng" id="stExtraBtn">Fazer uma sessão extra (não conta como dia)</button></div>`;
  } else {
    if (!sessionOpen){ stSession = stPick(cont, rec); exAns = {}; exGraded = {}; }
    h += `<p class="exsessioninfo">${stExtra ? "Sessão extra: não conta como dia de estudo." : `Sessão de hoje: ${stSession.length} unidades sorteadas. Responda tudo em cada uma e clique em Concluir.`}</p>` +
      stSession.map(u => { const total = u.items.length, d = !!exGraded[u.id];
        return `<div class="exunit" data-u="${u.id}"><div class="exunithead"><b>${esc(u.title)}</b><span class="exprog">${d ? "✓" : "0/" + total}</span></div>
          ${u.lead ? `<p class="exlead">${esc(u.lead)}</p>` : ""}${u.expl ? `<div class="exexpl">${u.expl}</div>` : ""}
          <ol class="exlist">${u.items.map((it,i) => exItemHtml(u,it,i,p,d)).join("")}</ol><div class="exdonearea" data-u="${u.id}"></div></div>`; }).join("");
    if (allGraded){
      let ok = 0, tot = 0; stSession.forEach(u => u.items.forEach((it,i) => { tot++; const l = p.exlog[exItemId(u.id,i)]; if (l && l.ok) ok++; }));
      h += `<div class="stpanel stok" id="stDone"><b>✓ Sessão concluída: ${ok} de ${tot} certas</b>`;
      if (stExtra) h += `<p class="note">Sessão extra concluída. Ela não conta como dia de estudo.</p>`;
      else if (state === "done") h += `<p class="note">Etapa concluída: você fez as ${flowRevs(lvl)} revisões. A próxima etapa da trilha foi liberada.</p>`;
      else h += `<p class="note">Revisão ${days-1} de ${flowRevs(lvl)} feita. A próxima libera em ${flowDM(flowDue(rec))}. Enquanto isso, siga as outras trilhas.</p>`;
      h += `<div class="exchoice"><button type="button" class="btng exchoicebtn" id="stBackFlow">Voltar ao fluxograma</button></div></div>`;
    }
  }
  body.innerHTML = h;
  if (sessionOpen || (!doneToday && state !== "done")) stSession.forEach(u => { u.items.forEach((it,i) => wireExItem(u,it,i)); renderDoneArea(u); });
  const bind = (id, fn) => { const e = document.getElementById(id); if (e) e.onclick = fn; };
  bind("stExtraBtn", () => { stExtra = true; stSession = stPick(cont, rec); exAns = {}; exGraded = {}; renderStep(); });
  bind("stUndo", () => { delete p.steps[sk(lvl,k)]; const r = flowRecW(p,lvl,k); r.status = ""; r.due = ""; afterChange(); renderStep(); });
  bind("stBackFlow", closeStepView);
  body.querySelectorAll("[data-conc]").forEach(b => b.onclick = () => stConclude(+b.dataset.conc));
  body.querySelectorAll("[data-concc]").forEach(b => b.onclick = () => { const n = Math.round(+(body.querySelector(".stcn") || {}).value); if (n >= 1 && n <= 365) stConclude(n); else toast("Digite de 1 a 365 dias."); });
}
function choiceHtml(inside){
  return `<div class="stchoice${inside ? " in" : ""}"><button type="button" class="chip fin" data-conc="0">✓ Concluir definitivamente</button>` +
    [1,3,7,14].map(n => `<button type="button" class="chip" data-conc="${n}">Revisar em ${n} ${n === 1 ? "dia" : "dias"}</button>`).join("") +
    `<span class="stcust"><label>Ou revisar em <input type="number" min="1" max="365" value="5" class="stcn" aria-label="Dias para revisar"> dias</label> <button type="button" class="chip" data-concc="1">Marcar</button></span></div>`;
}

/* ---------- etapa de tarefa (alfabeto / números) ---------- */
let stChk = [], stConfirm = false;
function renderTaskStep(h, task, body, head){
  const p = P(), {k,lvl} = stCtx, state = flowState(lvl,k), rec = flowRec(p,lvl,k), days = rec.days.length, inFlow = flowHas(lvl);
  if (head) head.textContent = inFlow && state !== "done" ? flowProgTxt(lvl,rec) : "";
  const vid = `<a class="btng stvid" href="https://www.youtube.com/results?search_query=${encodeURIComponent(task.vid)}" target="_blank" rel="noopener"><svg class="ytic" viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="5" fill="#e62117"/><path d="M11 5.5v9l8-4.5z" fill="#fff"/></svg> Ver vídeos no YouTube</a>`;
  if (inFlow) h += `<div class="stpanel"><div class="stprog"><b>${flowProgTxt(lvl,rec)}</b><div class="bar"><i style="width:${Math.min(100, days/flowNeed(lvl)*100)}%"></i></div><small>Cada revisão conta 2 dias depois da anterior.</small></div>${vid}</div>`;
  else h += `<div class="stpanel">${vid}</div>`;
  if (state === "lock"){ body.innerHTML = h + `<div class="stpanel"><b>Etapa ainda bloqueada.</b><p class="note">Conclua as etapas anteriores do fluxograma para liberar esta.</p></div>`; return; }
  h += `<div class="stpanel tkimg">${task.img()}</div>`;
  const doneToday = state === "wait", done = state === "done";
  if (!inFlow && !done && (stConfirm || state === "rev")){
    h += `<div class="stpanel"><b>${state === "rev" ? "Hora de revisar" : "Tarefa feita"}</b><p class="note">Escolha se conclui de vez ou quando quer revisar:</p>${choiceHtml()}</div>`;
  } else if (!done && !(inFlow && doneToday)){
    if (stChk.length !== task.tasks.length) stChk = task.tasks.map(() => false);
    h += `<div class="stpanel"><div class="lbl2">Tarefa de hoje</div>` + task.tasks.map((t,i) => `<label class="tktask"><input type="checkbox" data-tk="${i}"${stChk[i] ? " checked" : ""}> <span>${esc(t)}</span></label>`).join("") +
      `<button type="button" class="btnp" id="tkDone" disabled>${inFlow ? "Concluir o dia de hoje" : "Terminei a tarefa"}</button></div>`;
  } else if (done){
    h += `<div class="stpanel stok"><b>✓ Etapa concluída</b><p class="note">${rec.status === "rev" && rec.due ? `Revisão marcada para ${flowDM(rec.due)}.` : "Você marcou esta etapa como concluída definitivamente."}</p>
      <div class="exchoice"><button type="button" class="btng exchoicebtn" id="stUndo">Desmarcar etapa</button></div></div>`;
  } else {
    h += `<div class="stpanel stok"><b>${rec.last === T ? "✓ Tarefa de hoje concluída" : "Próxima revisão ainda não liberou"}</b><p class="note">Revisão ${days-1} de ${flowRevs(lvl)} feita. A próxima libera em ${flowDM(flowDue(rec))} (a cada ${FLOW_GAP} dias).</p></div>`;
    h += `<div class="exchoice"><button type="button" class="btng exchoicebtn" id="stBackFlow">Voltar ao fluxograma</button></div>`;
  }
  body.innerHTML = h;
  const btn = document.getElementById("tkDone");
  const sync = () => { if (btn) btn.disabled = !stChk.every(Boolean); };
  body.querySelectorAll("[data-tk]").forEach(c => c.onchange = () => { stChk[+c.dataset.tk] = c.checked; sync(); }); sync();
  if (btn) btn.onclick = () => {
    stChk = [];
    if (inFlow){
      const res = flowCountDay(p,lvl,k);
      if (res){ p.exDaily = {date:T, n: exDailyN(p) + 1}; exMarkDay(p); }
      updateLog(); save();
      if (res === "done"){ toast(`Etapa ${flowNum(lvl,k)} concluída!`); afterChange(); closeStepView(); }
      else { toast(`Revisão ${flowRec(p,lvl,k).days.length-1} de ${flowRevs(lvl)} feita!`); closeStepView(); }
    } else { stConfirm = true; renderStep(); }
  };
  const un = document.getElementById("stUndo"); if (un) un.onclick = () => { delete p.steps[sk(lvl,k)]; const r = flowRecW(p,lvl,k); r.status = ""; r.due = ""; afterChange(); renderStep(); };
  const bk = document.getElementById("stBackFlow"); if (bk) bk.onclick = closeStepView;
  body.querySelectorAll("[data-conc]").forEach(b => b.onclick = () => stConclude(+b.dataset.conc));
  body.querySelectorAll("[data-concc]").forEach(b => b.onclick = () => { const n = Math.round(+(body.querySelector(".stcn") || {}).value); if (n >= 1 && n <= 365) stConclude(n); else toast("Digite de 1 a 365 dias."); });
}

/* ao trocar de idioma com uma etapa aberta, fecha a tela da etapa (sem isso ela continuava no idioma antigo) */
function flowSync(){
  if (!stCtx || stCtx.lang === S.lang) return;
  exStepMode = null; stCtx = null; stSession = []; stChk = []; exAns = {}; exGraded = {};
  const sv = document.getElementById("stepView"), ml = document.getElementById("mainLayout");
  if (sv) sv.hidden = true; if (ml) ml.hidden = false;
}
