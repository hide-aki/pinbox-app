/**
 * These are all globals used in the main thread
 *
 * This file is merely for keeping track of the global objects
 *
 */
import Store from 'electron-store';
import {MessageSendService} from './features/ipcMessaging/outgoing';
import {AppTransientStateStore} from './features/stores/transient/appTransientStateStore';

// @ts-ignore
global.ipfs = null;
// @ts-ignore
global.messageSendService = null;
// @ts-ignore
global.appStore = null;
// @ts-ignore
global.userStore = null;
// @ts-ignore
global.currentPublicKey = null;
// @ts-ignore
global.ifs = null;


// TODO: refactor to a typed option
// global.singletons : GlobalSingletons = { ipfs, ifs, etc...}

const assertInstance = (instanceName: string) : any => {
    // @ts-ignore
    const instance  = global[instanceName];
    // if(!instance) throw Error(`Instance '${instanceName}' not available yet`);
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

export const userStoreInstance = (): Store => {
    return assertInstance('userStore')
};

export const internalFileStructureInstance = () => {
    return assertInstance('ifs')
};

