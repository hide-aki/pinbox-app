import {BrowserWindow, app, ipcMain, IpcMessageEvent} from 'electron' ;
import * as path from 'path'
import {handleMessage} from './handleMessage';

let mainWindow: BrowserWindow;

const isDev = process.env.NODE_ENV === 'dev';

export interface ElectronMessageType {
    messageName: string;
    payload: any;
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });

    const url = isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`;

    console.log('==================');
    console.log('Using url:', url);
    console.log('==================');

    mainWindow.loadURL(url);
    mainWindow.on("closed", () => (mainWindow.destroy()));

    ipcMain.on('channel', (event, msg: ElectronMessageType) => {
        handleMessage(msg)
    });

    mainWindow.maximize();
    mainWindow.show();
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
