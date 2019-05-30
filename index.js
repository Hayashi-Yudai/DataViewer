const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: { nodeIntegration: true }
  });
  mainWindow.loadURL("file://" + __dirname + "/index.html");

  mainWindow.on("closed", function() {
    electron.session.defaultSession.clearCache(() => {});
    mainWindow = null;
  });
});
