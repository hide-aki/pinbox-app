import {setPassword} from 'keytar'
import {generateMasterKeys} from '@burstjs/crypto';
import {IpcMessageTypeNewAccount} from '../../../../sharedTypings/IpcMessageTypeNewAccount';
import {KeyStoreServiceName} from '../../../../constants';
import {appStoreInstance} from '../../../../singletons';
import {AppTransientStatePaths, appTransientStateStore} from '../../../stores/transient/appTransientStateStore';
import {logger} from '../../../logger';

export const handleNewAccount = async (
    payload: IpcMessageTypeNewAccount
): Promise<void> => {
    const {passphrase} = payload;
    const {publicKey, agreementPrivateKey} = generateMasterKeys(passphrase);
    logger.debug(`Storing credentials in OS keystore: ${publicKey}`);
    await setPassword(KeyStoreServiceName, publicKey, agreementPrivateKey);
    logger.debug('Stored credentials successfully');
    const appStore = appStoreInstance();
    const users = appStore.get('users');
    users[publicKey] = {
        ifsCID: '',
        lastModified: Date.now(),
    };
    appStore.set("users", users);
    appTransientStateStore.set(AppTransientStatePaths.CurrentPublicKey, publicKey);
};
