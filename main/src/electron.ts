import {BrowserWindow, app, ipcMain, IpcMessageEvent, ipcRenderer} from 'electron' ;
import * as path from 'path'
import {handleMessage} from './handleMessage';
import {createIpfsNode} from './ipfs/createIpfsNode';
import {logger} from './logger';

let mainWindow: BrowserWindow;

const isDev = process.env.NODE_ENV === 'dev';

export interface ElectronMessageType {
    messageName: string;
    payload: any;
}

// @ts-ignore
global.ipfs = null;

function initializeIpfs() {
    createIpfsNode(async ipfsNode => {
        const ident = await ipfsNode.id();
        logger.info(`Successfully initialized IPFS node - ID: ${ident.id}`);
        // @ts-ignore
        global.ipfs = ipfsNode;
        mainWindow.webContents.send('channel', {
            messageName: 'IpfsReady',
            payload: {
                ipfsId: ident.id,
            }
        })
    });
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

    if(isDev){
        mainWindow.webContents.openDevTools();
    }

    const url = isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`;

    logger.info('Using url:', url);

    mainWindow.loadURL(url);
    mainWindow.on("closed", () => (mainWindow.destroy()));
    mainWindow.maximize();
    mainWindow.show();

    ipcMain.on('channel', (event, msg: ElectronMessageType) => {
        handleMessage(msg)
    });
}

app.on("ready", async () => {
    createWindow();
    initializeIpfs();
});
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
