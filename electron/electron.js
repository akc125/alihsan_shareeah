const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const isDev = !app.isPackaged;

let serverProcess;

function startBackend() {
  // Path to the backend server.js relative to this file
  // In dev: my-app/electron/electron.js -> backend/server.js
  // In prod: We will configure electron-builder to include 'backend' folder
  const serverPath = isDev
    ? path.join(__dirname, "../../backend/server.js")
    : path.join(process.resourcesPath, "backend/server.js");

  console.log(`Starting backend at: ${serverPath}`);
  
  serverProcess = spawn("node", [serverPath], {
    env: { ...process.env, PORT: 5000 },
    stdio: "inherit",
  });

  serverProcess.on("error", (err) => {
    console.error("Failed to start backend process:", err);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:3000");
    // win.webContents.openDevTools();
  } else {
    // In production, load the exported files from the 'out' directory
    const indexPath = path.join(__dirname, "../out/index.html");
    win.loadFile(indexPath);
  }
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (serverProcess) serverProcess.kill();
    app.quit();
  }
});

app.on("will-quit", () => {
  if (serverProcess) serverProcess.kill();
});
