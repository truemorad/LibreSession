const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const fs = require('fs').promises;
const path = require('node:path');
const { json } = require('node:stream/consumers');

// main window
let mainWindow;
app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    width: 777,
    minWidth: 777,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
      // ,devTools: false
    },
    frame: false
  });
  // load html
  try{
    scan = await fs.readFile(path.join(path.join(__dirname, 'db'), 'userPath.json'));
    dirPath = JSON.parse(scan)
    mainWindow.loadFile('src/index.html');
    mainWindow.webContents.send('vault-exist', dirPath.path);
  } catch (error) {
    mainWindow.loadFile('src/start.html');
  }
  // event listeners for mult max button
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('is-maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('is-unmaximized');
  });
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
ipcMain.handle('open-external-window', async (event, url) => {
  try {
    // Validate URL before opening
    const validUrlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!validUrlPattern.test(url)) {
      return 'wrong';
    }
    // Ensure URL starts with protocol
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    await shell.openExternal(formattedUrl);
  } catch (error) {
    return error;
  }
});
// get data with a command
ipcMain.handle('get-data', async (event, data) => {
  switch (data) {
    case "gimmestyle":
      try{
        const userDataPath = path.join(__dirname, 'db');
        const fileData = await fs.readFile(path.join(userDataPath, 'userStyle.json'));
        const style = JSON.parse(fileData);
        return style;
      } catch (err) {
        console.log("NOSTYLE")
      };

    default:
      console.log("get-data failed")
  }
});
// handle location path
ipcMain.handle('get-location', async() => {
  dirPath = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  return dirPath.filePaths;
});
// handle vault creation
ipcMain.handle('create-vault', async (event, origpath, name) => {
  dirPath = {path: path.join(origpath, name)};
  await fs.mkdir(path.join(origpath, name), { recursive: true });
  vaultStore(dirPath);
  mainWindow.loadFile('src/index.html');
});
// handle vault loading
ipcMain.handle('get-vault', async (event, origPath) => {
  dirPath = origPath;
  if (Array.isArray(dirPath) && dirPath.length === 0) {
    return 'Select A Folder Please'
  } else {
    mainWindow.loadFile('src/index.html');
    vaultStore(dirPath[0]);
  };
});
// store text in md file
ipcMain.handle('store-md', async (event, text) => {
  const filePath = path.join(dirPath.path, 'userNote.md');
  await fs.writeFile(filePath, text);
});
// storing vault path
const vaultStore = async (object) => {
  const jsonPath = {path: object};
  const userDataPath = path.join(__dirname, 'db');
  const filePath = path.join(userDataPath, 'userPath.json');
  await fs.writeFile(filePath, JSON.stringify(jsonPath));
}