import {logger} from '../logger';
import {Keys} from '@burstjs/crypto';
import {FileStructure} from './FileStructure';
import * as argon from 'argon2'


export const initializeFileStructure = (keys: Keys) => {

    const fileStructure = new FileStructure(keys.agreementPrivateKey, keys.publicKey)

    // TODO
    logger.info('Internal File Structure initialized')
};
