import {IpcMessageTypeNoKeystoreEntry} from '../../../../../../main/src/sharedTypings/IpcMessageTypeNoKeystoreEntry';

export const handleNoKeystoreEntry = (payload:IpcMessageTypeNoKeystoreEntry) => {
    console.error('No keystore entry');
    // goto login!
};
