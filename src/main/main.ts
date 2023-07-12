/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import fs from 'fs';
import { json } from 'stream/consumers';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('restoreSavedData', async (event, arg) => {
  fs.copyFile(`./savedjsons/${arg}`, 'jsondb.json', (err) => {
    if (err) throw err;
    console.log('jsondb.json was copied to destination.json');
  });
});

ipcMain.on('eraseSavedData', async (event, arg) => {
  fs.unlink(`./savedjsons/${arg}`, (err) => {
    if (err) throw err;
    console.log('arg was erased');
  });
});

ipcMain.on('ipc-example', async (event, arg) => {
  console.log('THIS IS THE ARG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', arg);
  console.log('end of arg');

  let jsonString = JSON.stringify(arg);
  fs.writeFileSync('jsondb.json', jsonString);

  event.reply('ipc-example', 'pong');
});

ipcMain.on('get-last-registro', async (event, arg) => {
  const registroDB = JSON.parse(fs.readFileSync('registrodb.json', 'utf8'));

  event.reply('got-last-registro', registroDB.lastnumber + 1);
});

ipcMain.on('get-full-registro', async (event, arg) => {
  const registroDB = JSON.parse(fs.readFileSync('registrodb.json', 'utf8'));

  event.reply('got-full-registro', registroDB);
});

ipcMain.on('get-this-registro', async (event, arg) => {
  const registroDB = JSON.parse(fs.readFileSync('registrodb.json', 'utf8'));
  const jsonDB = JSON.parse(fs.readFileSync('jsondb.json', 'utf8'));
  event.reply('got-this-registro', registroDB[arg]);

  const componentsArray = Object.keys(registroDB[arg]);
  // aqui deberia sacar refs

  console.warn(componentsArray);

  let returnArray = [];
  componentsArray.forEach((element) => {
    if (jsonDB.rawMats[element]) {
      returnArray.push({
        kkey: jsonDB.rawMats[element].kkey,
        components: false,
      });
    }
    if (jsonDB.formulas[element]) {
      let componentsOfObject = jsonDB.formulas[element].components;

      let keysOfObject = Object.keys(componentsOfObject);

      keysOfObject.forEach((key) => {
        if (jsonDB.rawMats[key]) {
          componentsOfObject[key] = {
            kkey: jsonDB.rawMats[key].kkey,
            cantidad: componentsOfObject[key],
          };
        } else if (jsonDB.formulas[key]) {
          componentsOfObject[key] = {
            kkey: jsonDB.formulas[key].kkey,
            cantidad: componentsOfObject[key],
          };
        }
      });

      returnArray.push({
        kkey: jsonDB.formulas[element].kkey,
        components: componentsOfObject,
      });
    }
  });

  console.log(returnArray);
  event.reply('got-refs', returnArray);
});

ipcMain.on('get-refs', async (event, arg: Array) => {
  const jsonDB = JSON.parse(fs.readFileSync('jsondb.json', 'utf8'));

  const returnArray = [];
  arg.forEach((element) => {
    if (jsonDB.rawMats[element]) {
      returnArray.unshift(jsonDB.rawMats[element].kkey);
    }
    if (jsonDB.formulas[element]) {
      jsonDB.formulas[element].kkey;
    }
  });

  event.reply('got-refs', returnArray);
});

ipcMain.on('delete-this-registro', async (event, arg) => {
  let registroDB = JSON.parse(fs.readFileSync('registrodb.json', 'utf8'));
  delete registroDB[arg];
  let jsonString = JSON.stringify(registroDB);
  fs.writeFileSync('registrodb.json', jsonString);
  event.reply('deleted-this-registro');
});

ipcMain.on('registrar', async (event, arg) => {
  console.log('registrando', arg);

  let registro = arg.registro;
  let cantidad = arg.cantidad;
  let product = arg.product;

  let today = new Date();
  let date = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`;

  const registroDB = JSON.parse(fs.readFileSync('registrodb.json', 'utf8'));

  if (registroDB[registro]) {
    event.reply('existe-registro');
  } else {
    registroDB[registro] = {};
    registroDB[registro][product.name] = {
      cantidad: cantidad,
      components: product.components,
      date: date,
    };
    if (registroDB.lastnumber < Number(registro)) {
      registroDB.lastnumber = Number(registro);
    }
    let jsonString = JSON.stringify(registroDB);
    fs.writeFileSync('registrodb.json', jsonString);
    event.reply('registro-completo');
  }
});

ipcMain.on('add-to-registro', async (event, arg) => {
  console.log('forzando registro');

  let today = new Date();
  let date = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`;

  let registro = arg.registro;
  let cantidad = arg.cantidad;
  let product = arg.product;

  const registroDB = JSON.parse(fs.readFileSync('registrodb.json', 'utf8'));

  registroDB[registro][product.name] = {
    cantidad: cantidad,
    components: product.components,
    date: date,
  };
  let jsonString = JSON.stringify(registroDB);
  fs.writeFileSync('registrodb.json', jsonString);
  event.reply('registro-completo');
});

ipcMain.on('newSaveData', async (event, arg) => {
  console.log('will save new data');

  const date = new Date();

  const year = date.getFullYear();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

  const filename = `${year}${month}${day}`;

  fs.copyFile('jsondb.json', `./savedjsons/${filename}.json`, (err) => {
    if (err) throw err;
    console.log('jsondb.json was copied to destination.json');
  });

  //let jsonString = JSON.stringify(arg);
  //fs.writeFileSync('jsondb.json', jsonString);

  event.reply('ipc-example', 'pong');
});

ipcMain.on('getFullSetOfData', async (event, arg) => {
  const jsonDB = JSON.parse(fs.readFileSync('jsondb.json', 'utf8'));
  //fs.writeFileSync("thing.json", jsonString)
  console.log(jsonDB);

  event.reply('getFullSetOfData', jsonDB);
  //event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('getSavedFiles', async (event, arg) => {
  //getting saved files

  const CWD = process.cwd();
  fs.readdir(`${CWD}/savedjsons`, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } else {
      event.reply('sendSavedFiles', files);
    }
  });

  //event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
