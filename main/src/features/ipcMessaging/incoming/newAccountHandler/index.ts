import {setPassword} from 'keytar'
import {generateMasterKeys} from '@burstjs/crypto';
import {IpcMessageTypeNewAccount} from '../../../../sharedTypings/IpcMessageTypeNewAccount';
import {KeyStoreServiceName} from '../../../../constants';
import {appStoreInstance} from '../../../../globals';
import {InternalFileStructure} from '../../../internalFileStructure/InternalFileStructure';

export const handleNewAccount = async (
    payload: IpcMessageTypeNewAccount
): Promise<void> => {
    const {passphrase} = payload;
    const {publicKey, agreementPrivateKey} = generateMasterKeys(passphrase);
    await setPassword(KeyStoreServiceName, publicKey, agreementPrivateKey);
    // const internalFileStructure = new InternalFileStructure();
    // const ipfsHash = await internalFileStructure.saveToIpfs(publicKey);
    // const appStore = appStoreInstance();
    // const users = appStore.get('users');
    // users[publicKey] = {
    //     ifsCID: ipfsHash,
    //     lastModified: Date.now(),
    // };
    // appStore.set("users", users);

    // @ts-ignore
    global.currentPublicKey = publicKey
};
