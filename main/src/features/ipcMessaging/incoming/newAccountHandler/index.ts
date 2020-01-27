import {setPassword} from 'keytar'
import {generateMasterKeys} from '@burstjs/crypto';
import {IpcMessageTypeNewAccount} from '../../../../sharedTypings/IpcMessageTypeNewAccount';
import {KeyStoreServiceName} from '../../../../constants';
import {appStoreInstance} from '../../../../globals';

export const handleNewAccount = async (
    payload: IpcMessageTypeNewAccount
) : Promise<void> => {
    const {passphrase} = payload;
    const keys = generateMasterKeys(passphrase);
    await setPassword(KeyStoreServiceName, keys.publicKey, keys.agreementPrivateKey);
    // TODO: be careful with new accounts and existing store!
    // Need to check whether this account already has an ifs in the blockchain, or not
    appStoreInstance().set('publicKey', keys.publicKey)
};
