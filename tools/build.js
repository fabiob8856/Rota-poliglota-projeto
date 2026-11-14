/* Junta os arquivos de src/ em app/index.html (mesma ordem usada na versão web). */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), src = path.join(root, "src");
const all = fs.readdirSync(src);
const glob = re => all.filter(f => re.test(f)).sort();
const order = [
  "01-head.html","02-body.html","03-core-a.js","03b-missions.js","04-core-b.js","05-core-c.js","06-board.js",
  "10-en-levels.js","11-en-extra.js","11b-en-phrases-a.js","11b-en-phrases-b.js",
  "12-es.js","13-fr.js","14-ru.js","15-tr.js","15b-ar.js","11c-es-fr-phrases.js","11d-ru-tr-phrases.js","11e-ar-phrases.js",
  "16-exercises.js", ...glob(/^16[b-z]-ex-.*\.js$/), ...glob(/^16v.*\.js$/),
  "17-review.js","18a-books.js","18-writing.js","18b-textbook.js","19a-knight.js","19-flow.js","19b-tasks.js",
  ...glob(/^20.*\.js$/), ...glob(/^(21|22|23).*\.js$/), "99-init.js"
];
const body = order.map(f => fs.readFileSync(path.join(src, f), "utf8")).join("");
const pkg = require("../package.json");
const html = `<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rota Poliglota</title></head><body>\n${body}\n</body></html>\n`;
fs.mkdirSync(path.join(root, "app"), { recursive: true });
fs.writeFileSync(path.join(root, "app", "index.html"), html);
console.log("app/index.html gerado (" + Math.round(html.length / 1024) + " KB) · versão " + pkg.version);
