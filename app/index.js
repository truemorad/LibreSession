const { app, BrowserWindow, ipcMain, shell, ipcRenderer, contextBridge } = require('electron');
const fs = require('fs').promises;
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
      // ,devTools: false
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
// window action buttons
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
// store user data
ipcMain.handle('store-user-data', async (event, data) => {
  try {
    // Create the user data directory path
    const userDataPath = path.join(__dirname, 'db');
    const filePath = path.join(userDataPath, 'userStyle.json');
    // Ensure the directory exists
    await fs.mkdir(userDataPath, { recursive: true });
    // Write updated styles back to file
    await fs.writeFile(filePath, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error in store-user-data:', error);
    throw error;
  }
});
// open external window for Links
ipcMain.handle('open-external-window', (event, url) => {
  shell.openExternal(url);
});
ipcMain.handle('get-data', async (event, data) => {
  if (data === "gimmestyle"){
    try {
      const userDataPath = path.join(__dirname, 'db');
      const fileData = await fs.readFile(path.join(userDataPath, 'userStyle.json'));
      const style = JSON.parse(fileData);
      return style;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return error;
      }
    }
  }
});