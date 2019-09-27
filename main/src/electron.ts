import {BrowserWindow, app, ipcMain} from 'electron' ;
import * as path from 'path'
import {handleMessage} from './handleMessage';
import {createIpfsNode} from './ipfs/createIpfsNode';
import {logger} from './logger';
import {IpcChannelName} from './constants';
import {initializeMetaInfo} from './metaInfo';

let mainWindow: BrowserWindow;

const isDev = process.env.NODE_ENV === 'dev';

export interface ElectronMessageType {
    messageName: string;
    payload: any;
}

// @ts-ignore
global.ipfs = null;

function initializeApp() {
    createIpfsNode(async ipfsNode => {
        const ident = await ipfsNode.id();
        logger.info(`Successfully initialized IPFS node - ID: ${ident.id}`);
        // @ts-ignore
        global.ipfs = ipfsNode;
        mainWindow.webContents.send(IpcChannelName, {
            messageName: 'IpfsReady',
            payload: {
                ipfsId: ident.id,
            }
        });

        // TODO: this can only be done, when logged in
        initializeMetaInfo()
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

    ipcMain.on(IpcChannelName, (event, msg: ElectronMessageType) => {
        handleMessage(msg)
    });
}

app.on("ready", async () => {
    createWindow();
    initializeApp();
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
