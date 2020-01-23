import './globals'
import {app, ipcMain, BrowserWindow} from 'electron';
import * as path from 'path'
import {handleMessage} from './features/ipcMessaging/incoming';
import {createIpfsNode} from './features/ipfs/createIpfsNode';
import {logger} from './features/logger';
import {IpcChannelName} from './constants';
import {IpcMessage} from './common/typings/IpcMessage';
import {initializeMessageService} from './features/ipcMessaging/outgoing';
import {IpfsReadyMessage} from './features/ipcMessaging/outgoing/providers';
import {isDevelopment} from './util/isDevelopment';
import {createAppStore} from './features/store';

let mainWindow: BrowserWindow;
const isDev = isDevelopment();

function initializeApp() {
    const messageSendService = initializeMessageService(mainWindow.webContents);
    createAppStore();
    createIpfsNode(async ipfsNode => {
        const ident = await ipfsNode.id();
        logger.info(`Successfully initialized IPFS node - ID: ${ident.id}`);
        // @ts-ignore
        global.ipfs = ipfsNode;
        messageSendService.send(IpfsReadyMessage(ident))
    });
}

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            // must be .js as it gets compiled to it!
            preload: path.join(app.getAppPath(), '/preload.js')
        }
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    const url = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, "../build/index.html")}`;

    logger.info(`Using url: ${url}`);

    mainWindow.on("closed", () => (mainWindow.destroy()));

    ipcMain.on(IpcChannelName, (event, msg: IpcMessage<any>) => {
        handleMessage(msg)
    });

    await mainWindow.loadURL(url);
    mainWindow.maximize();
    mainWindow.show();
}

app.on("ready", async () => {
    await createWindow();
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
