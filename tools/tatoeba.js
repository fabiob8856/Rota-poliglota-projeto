#!/usr/bin/env node
/* Gera a lista de frases do Tatoeba (com gravação de voz real e tradução em português) para o Projeto Hermes.
 *
 * Uso (na pasta do projeto):   node tools/tatoeba.js
 * Opções:  --per 360     frases por idioma (padrão 360, distribuídas pelos 6 níveis)
 *          --nc          aceita também gravações com licença NC/ND (padrão: só CC0, CC BY e CC BY-SA)
 *          --from PASTA  usa arquivos já extraídos (sentences.csv, sentences_with_audio.csv, links.csv)
 * Precisa de: Node 18+, internet e o comando "tar" (já vem no Windows 10/11).
 * Saída: src/29g-tatoeba-data.js — depois rode: node tools/build.js
 *
 * Os dados do Tatoeba (tatoeba.org) são livres; as frases são CC BY 2.0 FR e cada gravação tem a licença
 * do seu autor. O script só guarda gravações com licença livre e registra o autor de cada uma.
 */
const fs = require("fs"), path = require("path"), https = require("https"), readline = require("readline");
const { execFileSync } = require("child_process");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i < 0 ? d : (process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : true); };
const PER = parseInt(arg("per", 360)), NC = !!arg("nc", false);
const ROOT = path.join(__dirname, ".."), CACHE = arg("from", path.join(ROOT, ".tatoeba-cache"));
const CODES = { eng: "en", spa: "es", fra: "fr", rus: "ru", tur: "tr", ara: "ar" };
const BASE = "https://downloads.tatoeba.org/exports/";
const FILES = [["sentences_with_audio", "sentences_with_audio.tar.bz2"], ["sentences", "sentences.tar.bz2"], ["links", "links.tar.bz2"]];
fs.mkdirSync(CACHE, { recursive: true });

function get(url, dest, redirects = 5){ return new Promise((res, rej) => {
  https.get(url, r => {
    if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && redirects) { r.resume(); return get(new URL(r.headers.location, url).href, dest, redirects - 1).then(res, rej); }
    if (r.statusCode !== 200) { r.resume(); return rej(new Error("HTTP " + r.statusCode + " em " + url)); }
    const total = +r.headers["content-length"] || 0; let got = 0, last = 0; const f = fs.createWriteStream(dest + ".part");
    r.on("data", c => { got += c.length; if (Date.now() - last > 1500) { last = Date.now(); process.stdout.write(`\r  ${(got / 1e6).toFixed(0)}${total ? " / " + (total / 1e6).toFixed(0) : ""} MB   `); } });
    r.pipe(f); f.on("finish", () => { fs.renameSync(dest + ".part", dest); process.stdout.write("\n"); res(); }); f.on("error", rej);
  }).on("error", rej); }); }

async function ensure(){
  for (const [name, file] of FILES) {
    const csv = path.join(CACHE, name + ".csv"); if (fs.existsSync(csv)) continue;
    const arc = path.join(CACHE, file);
    if (!fs.existsSync(arc)) { console.log("Baixando " + file + " ..."); await get(BASE + file, arc); }
    console.log("Extraindo " + file + " ..."); execFileSync("tar", ["-xjf", arc, "-C", CACHE], { stdio: "inherit" });
    if (!fs.existsSync(csv)) throw new Error("Não achei " + name + ".csv depois de extrair " + file);
  }
}
function lines(file, cb){ return new Promise(res => { const rl = readline.createInterface({ input: fs.createReadStream(file, { encoding: "utf8" }), crlfDelay: Infinity }); rl.on("line", l => cb(l.split("\t"))); rl.on("close", res); }); }
const okLic = l => { const s = String(l || "").trim(); if (!s) return false; if (!NC && /(NC|ND)/i.test(s)) return false; return /^(CC0|CC[ -]BY|Public domain|PD)/i.test(s) || /CC0|CC[ -]BY/i.test(s); };
const nWords = t => t.trim().split(/\s+/).length;
const rnd = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const level = n => n <= 4 ? 0 : n <= 6 ? 1 : n <= 8 ? 2 : n <= 10 ? 3 : n <= 13 ? 4 : 5;

(async () => {
  await ensure();
  /* 1) gravações com licença livre */
  const audio = new Map(); let rows = 0, skipped = 0;
  await lines(path.join(CACHE, "sentences_with_audio.csv"), f => { if (!/^\d+$/.test(f[0])) return; rows++;
    if (!okLic(f[3])) { skipped++; return; } audio.set(f[0], { aid: f[1], user: f[2] || "", lic: (f[3] || "").trim() }); });
  console.log(`Gravações: ${rows}; com licença livre: ${audio.size}; ignoradas por licença: ${skipped}`);
  if (!audio.size) throw new Error("Nenhuma gravação com licença aceita — confira o formato de sentences_with_audio.csv.");
  /* 2) frases com gravação, nos 6 idiomas */
  const cand = {}; Object.values(CODES).forEach(l => cand[l] = []); const byId = new Map();
  await lines(path.join(CACHE, "sentences.csv"), f => { const lg = CODES[f[1]]; if (!lg || !audio.has(f[0])) return; const t = (f[2] || "").trim();
    const n = nWords(t); if (n < 2 || n > 18 || t.length > 120) return; const o = { sid: f[0], lg, t, ...audio.get(f[0]) }; cand[lg].push(o); byId.set(f[0], o); });
  /* 3) traduções para o português (pelos links) */
  const link = new Map();
  await lines(path.join(CACHE, "links.csv"), f => { if (byId.has(f[0])) { (link.get(f[0]) || link.set(f[0], []).get(f[0])).push(f[1]); } });
  const wanted = new Set(); link.forEach(a => a.forEach(x => wanted.add(x)));
  const pt = new Map();
  await lines(path.join(CACHE, "sentences.csv"), f => { if (f[1] === "por" && wanted.has(f[0])) pt.set(f[0], (f[2] || "").trim()); });
  /* 4) escolhe frases variadas, distribuídas pelos níveis e sem concentrar num só autor */
  const out = {}; const per = Math.ceil(PER / 6);
  for (const lg of Object.keys(cand)) {
    const list = cand[lg].map(o => { const t = (link.get(o.sid) || []).map(i => pt.get(i)).filter(Boolean)[0]; return t ? { ...o, pt: t } : null; }).filter(Boolean);
    const r = rnd(lg.charCodeAt(0) * 31 + lg.charCodeAt(1)); list.sort(() => r() - .5);
    const lv = [[], [], [], [], [], []]; list.forEach(o => lv[level(nWords(o.t))].push(o));
    const pick = []; lv.forEach(a => { const cnt = {}; const cap = Math.max(3, Math.ceil(per * .3)); for (const o of a) { if (pick.filter(x => x.__l === a).length >= per) break; if ((cnt[o.user] = (cnt[o.user] || 0) + 1) > cap) continue; o.__l = a; pick.push(o); } });
    out[lg] = pick.map(o => [+o.aid || o.aid, o.t, o.pt, o.user, o.lic]);
    console.log(`${lg}: ${list.length} frases com gravação e tradução → ${out[lg].length} escolhidas`);
  }
  const dest = path.join(ROOT, "src", "29g-tatoeba-data.js");
  fs.writeFileSync(dest, `/* gerado por tools/tatoeba.js em ${new Date().toISOString().slice(0, 10)} — dados do Tatoeba (tatoeba.org): frases CC BY 2.0 FR; cada gravação tem a licença do seu autor */\nwindow.TATO_SENT = ${JSON.stringify(out)};\n`);
  console.log("Pronto: " + dest + "\nAgora rode: node tools/build.js");
})().catch(e => { console.error("\nERRO: " + e.message); process.exit(1); });
