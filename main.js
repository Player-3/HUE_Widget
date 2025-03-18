const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 100, // Small widget size
    height: 100,
    frame: false, // No borders
    transparent: true, // Optional transparency
    alwaysOnTop: true, // Stays above other windows (optional)
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadURL('http://localhost:4200'); // Angular dev server
  win.setPosition(50, 50); // Position on desktop
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});