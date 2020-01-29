import {messageSendServiceInstance} from '../../globals';
import {getPassword} from 'keytar';
import {KeyStoreServiceName} from '../../constants';
import {hashSecret} from './hashSecret';
import {NoKeystoreEntryMessage} from '../ipcMessaging/outgoing/providers';

export async function derivePassword(publicKey: string, nonce: string): Promise<string> {
    const privateKey = await getPassword(KeyStoreServiceName, publicKey);
    if (!privateKey) {
        messageSendServiceInstance().send(NoKeystoreEntryMessage());
        return Promise.reject('No key found');
    }
    const hashedResult = await hashSecret(`${nonce}.${privateKey}`);
    return hashedResult.hash;
}