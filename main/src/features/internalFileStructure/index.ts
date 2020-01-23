import {logger} from '../logger';
import {Keys} from '@burstjs/crypto';
import {FileStructure} from './FileStructure';

export const initializeFileStructure = (keys: Keys) => {
    // @ts-ignore
    global.internalFileStructure = new FileStructure(keys.agreementPrivateKey, keys.publicKey);

    // check if exists already...and reload it
    // otherwise
    // TODO
    logger.info('Internal File Structure initialized')
};
