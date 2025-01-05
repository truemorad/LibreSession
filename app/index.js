const { app, nativeImage, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('node:path');

// main window
let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    frame: false
  });
  // load html
  mainWindow.loadFile('src/index.html');
});
// close app when there is no windows
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// min max close buttons
ipcMain.handle('window-action', (event, action) => {
  if (!mainWindow);

  switch (action) {
    case 'min':
      mainWindow.minimize();
      return 'min';

    case 'max':
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
        return 'mult';
      } else {
        mainWindow.maximize();
        return 'max';
      };

    case 'close':
      mainWindow.close();
      return 'close';

    default:
      console.log(`Unknown action: ${action}`);
  };
});