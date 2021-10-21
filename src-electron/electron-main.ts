import { enable, initialize } from '@electron/remote/main';
import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

try {
  if (
    process.platform === 'win32' &&
    nativeTheme.shouldUseDarkColors === true
  ) {
    unlinkSync(join(app.getPath('userData'), 'DevTools Extensions'));
  }
} catch (_) {}

initialize();

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 600 / 2 + 32,
    frame: false,
    backgroundColor: '1E1E1E',
    autoHideMenuBar: true,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD!),
    },
  });

  enable(mainWindow.webContents);

  void mainWindow.loadURL(process.env.APP_URL!);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
    // increase width for dev tools
    mainWindow.setSize(800 + 723, 600);
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

const STORE_FILE_PATH: string = join(app.getPath('userData'), 'store.json');

ipcMain.handle('loadStore', (): unknown => {
  if (!existsSync(STORE_FILE_PATH)) {
    writeFileSync(STORE_FILE_PATH, JSON.stringify({ series: [] }));
  }
  return JSON.parse(readFileSync(STORE_FILE_PATH, 'utf8'));
});

ipcMain.handle('persistStore', (_, payload: string) => {
  writeFileSync(STORE_FILE_PATH, payload);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
