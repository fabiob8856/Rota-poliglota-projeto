const { app, BrowserWindow, shell, dialog, Menu } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

/* mantém a pasta de dados antiga, para não perder o progresso salvo */
app.setPath("userData", path.join(app.getPath("appData"), "Rota Poliglota"));
if (!app.requestSingleInstanceLock()) { app.quit(); }

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 360, minHeight: 600,
    title: "Projeto Hermes", icon: path.join(__dirname, "..", "build", "icon.png"), autoHideMenuBar: true, backgroundColor: "#12182e",
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
      title: "Atualização pronta", message: `A versão ${info.version} do Projeto Hermes foi baixada.`,
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
