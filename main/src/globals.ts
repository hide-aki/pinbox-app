/**
 * These are all globals used in the main thread
 *
 * This file is merely for keeping track of the global objects
 *
 */
import Store from 'electron-store';
import {MessageSendService} from './features/ipcMessaging/outgoing';
import {InternalFileStructure} from './features/internalFileStructure/InternalFileStructure';

// @ts-ignore
global.ipfs = null;
// @ts-ignore
global.messageSendService = null;
// @ts-ignore
global.internalFileStructure = null;
// @ts-ignore
global.appStore = null;


export const ipfsInstance = (): any => {
// @ts-ignore
    return global.ipfs
};

export const messageSendServiceInstance = (): MessageSendService => {
// @ts-ignore
    return global.messageSendService
};

export const internalFileStructureInstance = (): InternalFileStructure => {
// @ts-ignore
    return global.internalFileStructure
};

export const appStoreInstance = (): Store => {
// @ts-ignore
    return global.appStore
};


