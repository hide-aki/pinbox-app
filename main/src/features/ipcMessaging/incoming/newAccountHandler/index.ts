import {setPassword} from 'keytar'
import {generateMasterKeys} from '@burstjs/crypto';
import {IpcMessageTypeNewAccount} from '../../../../sharedTypings/IpcMessageTypeNewAccount';
import {KeyStoreServiceName} from '../../../../constants';
import {fetchInternalFileStructure, InternalFileStructure} from '../../../internalFileStructure';
import {appStoreInstance} from '../../../../globals';

async function resetInternalFileStructure(publicKey: string) {
    const ifs = await fetchInternalFileStructure(publicKey)
    // send ifs message change
}

export const handleNewAccount = async (
    payload: IpcMessageTypeNewAccount
): Promise<void> => {
    const {passphrase} = payload;
    const {publicKey, agreementPrivateKey} = generateMasterKeys(passphrase);
    await setPassword(KeyStoreServiceName, publicKey, agreementPrivateKey);
    await resetInternalFileStructure(publicKey);

    const appStore = appStoreInstance();
    const users = appStore.get('users');
    users[publicKey] = {
        ifsCID: '',
        lastModified: Date.now(),
    };
    appStore.set("users", users);

    // @ts-ignore
    global.currentPublicKey = publicKey

};
