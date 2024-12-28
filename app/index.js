const { app, nativeImage, BrowserWindow, Tray, Menu, ipcMain} = require('electron');
const path = require('node:path');

let mainWindow;
// main window
app.on('ready',() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    frame: false
  })
  // load html
  mainWindow.loadFile('index.html')

  // Create a context menu
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() },
  ]);
});

// close app when there is no windows
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  });
// min max close buttons
  ipcMain.on('window-action', (event, action) => {
    if (!mainWindow) return;
  
    switch (action) {
      case 'min':
        mainWindow.minimize();
        break;
      case 'max':
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
        break;
      case 'close':
        mainWindow.close();
        break;

      default:
        console.log(`Unknown action: ${action}`);
    }
  });