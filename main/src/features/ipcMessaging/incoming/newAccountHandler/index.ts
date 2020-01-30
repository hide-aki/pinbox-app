import {setPassword} from 'keytar'
import {generateMasterKeys} from '@burstjs/crypto';
import {IpcMessageTypeNewAccount} from '../../../../sharedTypings/IpcMessageTypeNewAccount';
import {KeyStoreServiceName} from '../../../../constants';
import {appStoreInstance} from '../../../../singletons';
import {AppTransientStatePaths, appTransientStateStore} from '../../../stores/transient/appTransientStateStore';

export const handleNewAccount = async (
    payload: IpcMessageTypeNewAccount
): Promise<void> => {
    const {passphrase} = payload;
    const {publicKey, agreementPrivateKey} = generateMasterKeys(passphrase);
    await setPassword(KeyStoreServiceName, publicKey, agreementPrivateKey);
    const appStore = appStoreInstance();
    const users = appStore.get('users');
    users[publicKey] = {
        ifsCID: '',
        lastModified: Date.now(),
    };
    appStore.set("users", users);
    appTransientStateStore.set(AppTransientStatePaths.CurrentPublicKey, publicKey);
};
