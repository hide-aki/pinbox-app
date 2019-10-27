import * as Electron from 'electron';
import {ElectronWindow} from '../typings/electron.window';
import {IpcRendererEvent} from 'electron';

declare let window: ElectronWindow;

interface ElectronMessageType {
    messageName: string;
    payload: any;
}

export class ElectronService {
    // @ts-ignore
    private _electron: Electron.RendererInterface;

    private get electron(): Electron.RendererInterface | null {
        if (!this._electron) {
            if (window && window.require) {
                this._electron = window.require('electron');
                return this._electron;
            }
            return null;
        }
        return this._electron;
    }

    /**
     * determines if SPA is running in Electron
     */
    public get isElectronApp(): boolean {
        return !!window.navigator.userAgent.match(/Electron/);
    }

    public get isMacOS(): boolean {
        return this.isElectronApp && process.platform === 'darwin';
    }

    public get isWindows(): boolean {
        return this.isElectronApp && process.platform === 'win32';
    }

    public get isLinux(): boolean {
        return this.isElectronApp && process.platform === 'linux';
    }

    public get isX86(): boolean {
        return this.isElectronApp && process.arch === 'ia32';
    }

    public get isX64(): boolean {
        return this.isElectronApp && process.arch === 'x64';
    }

    public get desktopCapturer(): Electron.DesktopCapturer | null {
        return this.electron ? this.electron.desktopCapturer : null;
    }

    public get ipcRenderer(): Electron.IpcRenderer | null {
        return this.electron ? this.electron.ipcRenderer : null;
    }

    public get remote(): Electron.Remote | null {
        return this.electron ? this.electron.remote : null;
    }

    public get webFrame(): Electron.WebFrame | null {
        return this.electron ? this.electron.webFrame : null;
    }

    public get clipboard(): Electron.Clipboard | null {
        return this.electron ? this.electron.clipboard : null;
    }

    public get crashReporter(): Electron.CrashReporter | null {
        return this.electron ? this.electron.crashReporter : null;
    }

    public get process(): any {
        return this.remote ? this.remote.process : null;
    }

    public get nativeImage(): typeof Electron.nativeImage | null {
        return this.electron ? this.electron.nativeImage : null;
    }

    // public get screen(): Electron.Screen | null {
    //     return this.electron ? this.electron.screen : null;
    // }

    public get shell(): Electron.Shell | null {
        return this.electron ? this.electron.shell : null;
    }

    public sendMessage(message: ElectronMessageType) {
        if (!this.ipcRenderer) {
            console.info('ipcRenderer not supported');
            return;
        }

        this.ipcRenderer.send('channel', message);
    }

    public onMessage(messageHandler: (message: ElectronMessageType) => void): void {
        if (!this.ipcRenderer) {
            console.info('ipcRenderer not supported');
            return;
        }
        this.ipcRenderer.on('channel', (event: IpcRendererEvent, message: ElectronMessageType) => {
            messageHandler(message)
        })
    }

    public openExternalLink(url: string): void {
        if (this.shell) {
            this.shell.openExternal(url);
        }
    }
}
