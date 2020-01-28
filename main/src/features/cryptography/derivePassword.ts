import {appStoreInstance, messageSendServiceInstance} from '../../globals';
import {getPassword} from 'keytar';
import {KeyStoreServiceName} from '../../constants';
import {hashSecret} from './hashSecret';
import {NoKeystoreEntryMessage} from '../ipcMessaging/outgoing/providers';

export async function derivePassword(nonce: string): Promise<string> {
    const store = appStoreInstance();
    if (!store) return Promise.reject("No store available yet");
    let publicKey = store.get('publicKey');
    const privateKey = await getPassword(KeyStoreServiceName, publicKey);
    if (!privateKey) {
        messageSendServiceInstance().send(NoKeystoreEntryMessage());
        return Promise.reject('No key found');
    }
    const hashedResult = await hashSecret(`${nonce}.${privateKey}`);
    return hashedResult.hash;
}
