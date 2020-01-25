import {generateMasterKeys} from '@burstjs/crypto';

export const handleNewAccount = (
    passphrase : string
) => {
    const keys = generateMasterKeys(passphrase);
    // what to do here?
};
