/* ---------- conteúdo das etapas: auxiliares (c = múltipla escolha, t = digitar) ---------- */
STEPU.en = STEPU.en || {};
const suRot = (q, opts, right) => { let h = 7; for (const ch of q) h = (h*31 + ch.charCodeAt(0)) >>> 0; const r = h % opts.length; const o = opts.map((_,i) => opts[(i+r) % opts.length]); return {opts:o, a:o.indexOf(right)}; };
const c = (q, right, wrongs, say) => { const {opts,a} = suRot(q, [right].concat(wrongs), right); const it = {t:"choice", q, opts, a}; if (say) it.say = say; return it; };
const t = (q, ans, hint, say) => { const it = {t:"type", q, a:ans.split("|")}; if (hint) it.hint = hint; if (say) it.say = say; return it; };
const defStep = (lvl, k, vid, units) => { STEPU.en[lvl] = STEPU.en[lvl] || {}; STEPU.en[lvl][k] = {vid, units: units.map((u,i) => ({id:`su-${lvl}-${k}-${i+1}`, title:u[0], expl:u[1] || "", items:u[2]}))}; };
