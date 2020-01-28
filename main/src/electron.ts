import './globals'
import {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path'
import {handleMessage} from './features/ipcMessaging/incoming';
import {createIpfsNode} from './features/ipfs/createIpfsNode';
import {logger} from './features/logger';
import {IpcChannelName} from './constants';
import {initializeMessageService} from './features/ipcMessaging/outgoing';
import {IpfsReadyMessage} from './features/ipcMessaging/outgoing/providers';
import {isDevelopment} from './utils/isDevelopment';
import {createAppStore} from './features/stores';
import {IpcMessage} from './sharedTypings/IpcMessage';
import * as os from 'os';

let mainWindow: BrowserWindow;
const isDev = isDevelopment();
let ExtensionPaths: any = null;
if (isDev && process.platform === 'linux') {
    const ChromeExtensionDir = path.join(os.homedir(), '.config/google-chrome/Default/Extensions');
    ExtensionPaths = {
        ReactDevTools: path.join(ChromeExtensionDir, 'fmkadmapgofadopljbjfkapdkoienihi/4.4.0_0'),
        ReduxDevTools: path.join(ChromeExtensionDir, 'lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0'),
    }
}


function initializeApp() {
    const messageSendService = initializeMessageService(mainWindow.webContents);
    createAppStore();
    createIpfsNode().then(async ipfsNode => {
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
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();

        if (ExtensionPaths) {
            BrowserWindow.addDevToolsExtension(ExtensionPaths.ReactDevTools);
            BrowserWindow.addDevToolsExtension(ExtensionPaths.ReduxDevTools);
        }
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
