const { app, BrowserWindow, shell, dialog, Menu } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

if (!app.requestSingleInstanceLock()) { app.quit(); }

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 360, minHeight: 600,
    title: "Rota Poliglota", autoHideMenuBar: true, backgroundColor: "#12182e",
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "..", "app", "index.html"));
  /* links externos (YouTube etc.) abrem no navegador do sistema */
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e, url) => { if (/^https?:/i.test(url)) { e.preventDefault(); shell.openExternal(url); } });
}

function setupUpdates() {
  if (!app.isPackaged) return; /* só no programa instalado */
  autoUpdater.autoDownload = true;
  autoUpdater.on("update-downloaded", info => {
    dialog.showMessageBox(win, {
      type: "info", buttons: ["Reiniciar e atualizar", "Depois"], defaultId: 0, cancelId: 1,
      title: "Atualização pronta", message: `A versão ${info.version} do Rota Poliglota foi baixada.`,
      detail: "Seu progresso fica salvo. Reinicie para usar a versão nova."
    }).then(r => { if (r.response === 0) autoUpdater.quitAndInstall(); });
  });
  autoUpdater.on("error", () => {}); /* sem internet: segue normalmente */
  autoUpdater.checkForUpdates().catch(() => {});
  setInterval(() => autoUpdater.checkForUpdates().catch(() => {}), 6 * 60 * 60 * 1000);
}

app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => { createWindow(); setupUpdates(); });
app.on("window-all-closed", () => app.quit());
