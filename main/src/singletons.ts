/**
 * These are all globals used in the main thread
 *
 * This file is merely for keeping track of the global objects
 *
 */
import Store from 'electron-store';
import {MessageSendService} from './features/ipcMessaging/outgoing';

// @ts-ignore
global.ipfs = null;
// @ts-ignore
global.messageSendService = null;
// @ts-ignore
global.appStore = null;

export interface Singletons {
    ipfs: any | null
    messageSendService: MessageSendService | null
    appStore: Store | null
}

const assertInstance = (instanceName: string) : any => {
    // @ts-ignore
    const instance  = global.singletons[instanceName];
    if(!instance) throw Error(`Instance '${instanceName}' not available yet`);
    return instance
};

export const ipfsInstance = (): any => {
    return assertInstance('ipfs')
};

export const messageSendServiceInstance = (): MessageSendService => {
    return assertInstance('messageSendService')
};

export const appStoreInstance = (): Store => {
    return assertInstance('appStore')
};

