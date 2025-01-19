const { contextBridge, ipcRenderer } = require('electron');

// All of the ipcMain APIs are available in the preload process only.
window.addEventListener('DOMContentLoaded', () => {
  //     const replaceText = (selector, text) => {
  //       const element = document.getElementById(selector)
  //       if (element) element.innerText = `(${text})`
  //     }

  //     for (const dependency of ['chrome', 'node', 'electron']) {
  //       replaceText(`${dependency}-version`, process.versions[dependency])
  //     }
  // electron bridge
  contextBridge.exposeInMainWorld('electronAPI', {
    sendWindowAction: async (action) => {
      const result = await ipcRenderer.invoke('window-action', action)
      return result;
    },
    storeUserStyle: async (style) => {
      const result = await ipcRenderer.invoke('store-user-data', style);
      return result;
    },
    sendOpenExternalWindow: async (url) => {
      const result = await ipcRenderer.invoke('open-external-window', url);
      return result;
    },
    getData: async (command) => {
      const result = await ipcRenderer.invoke('get-data', command);
      console.log(result);
      return result;
    }
  });
});