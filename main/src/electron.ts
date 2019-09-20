import {BrowserWindow, app, ipcMain, IpcMessageEvent} from 'electron' ;
import * as path from 'path'

let mainWindow: BrowserWindow;

const isDev = process.env.NODE_ENV === 'dev';

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

    console.log('================');
    console.log('Using url:', url);
    console.log('================');

    mainWindow.loadURL(url);
    mainWindow.on("closed", () => (mainWindow.destroy()));

    ipcMain.on('channel', (event, msg: any) => {
        console.log(msg);
        mainWindow.webContents.send('response', {title: 'mymessage', data: 1});
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
