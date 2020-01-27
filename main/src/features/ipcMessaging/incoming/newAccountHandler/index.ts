import {generateMasterKeys} from '@burstjs/crypto';
import {IpcMessageTypeNewAccount} from '../../../../sharedTypings/IpcMessageTypeNewAccount';

export const handleNewAccount = (
    payload: IpcMessageTypeNewAccount
) => {
    const {passphrase} = payload;
    const keys = generateMasterKeys(passphrase);
    // what to do here?
};
