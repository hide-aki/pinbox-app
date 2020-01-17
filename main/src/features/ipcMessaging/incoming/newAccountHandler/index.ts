import {logger} from '../../../logger';
import {generateMasterKeys} from '@burstjs/crypto';
import {initializeFileStructure} from '../../../internalFileStructure';

export const handleNewAccount = (
    passphrase : string
) => {
    const keys = generateMasterKeys(passphrase);
    initializeFileStructure(keys)
}
