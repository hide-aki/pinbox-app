import {BrowserWindow, app, ipcMain} from 'electron' ;
import * as path from 'path'
import {handleMessage} from './features/ipcMessaging/incoming';
import {createIpfsNode} from './features/ipfs/createIpfsNode';
import {logger} from './features/logger';
import {IpcChannelName} from './constants';
import {IpcMessage} from './typings/IpcMessage';
import {MessageSendService} from './features/ipcMessaging/outgoing';
import {IpfsReadyMessage} from './features/ipcMessaging/outgoing/providers';

let mainWindow: BrowserWindow;
let messageSendService: MessageSendService;

const isDev = process.env.NODE_ENV === 'dev';

// @ts-ignore
global.ipfs = null;

function initializeApp() {
    messageSendService = new MessageSendService(mainWindow.webContents);

    messageSendService.sendSuccessMessage("App started");

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
        }
    });

    if(isDev){
        mainWindow.webContents.openDevTools();
    }

    const url = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, "../build/index.html")}`;

    logger.info(`Using url: ${url}`);

    mainWindow.on("closed", () => (mainWindow.destroy()));

    ipcMain.on(IpcChannelName, (event, msg: IpcMessage) => {
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
