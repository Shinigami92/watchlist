/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

import { BrowserWindow } from '@electron/remote';
import { contextBridge, ipcRenderer } from 'electron';
import type { WatchlistElectronApi } from 'src/shared/WatchlistElectronApi';

contextBridge.exposeInMainWorld('electron', {
  // User persistent store
  async loadStore() {
    return await ipcRenderer.invoke('loadStore');
  },

  async persistStore(payload) {
    return await ipcRenderer.invoke('persistStore', payload);
  },

  // Window actions
  minimize() {
    BrowserWindow.getFocusedWindow()?.minimize();
  },

  toggleMaximize() {
    const win: Electron.BrowserWindow | null = BrowserWindow.getFocusedWindow();

    if (!win) {
      return;
    }

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  },

  close() {
    BrowserWindow.getFocusedWindow()?.close();
  },
} as WatchlistElectronApi);
