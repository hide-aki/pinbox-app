import {PersistenceService} from './PersistenceService';
import {generateMasterKeys, encryptAES, decryptAES, hashSHA256, Keys} from '@burstjs/crypto'

const ItemKey = 'k';

export class SecureKeyService {

    constructor(private persistenceService: PersistenceService = new PersistenceService()) {
    }

    storeKeys(pin: string, passphrase: string) {

        if (!(pin && pin.length)) {
            throw new Error('Invalid pin')
        }

        if (!(passphrase && passphrase.length)) {
            throw new Error('Invalid passphrase')
        }

        const pinHash = hashSHA256(pin);
        const keys = generateMasterKeys(passphrase);
        const keysStr = JSON.stringify(keys);
        this.persistenceService.storeItem(ItemKey, encryptAES(keysStr, pinHash));
    }

    getKeys(pin: string): Keys {
        const data = this.persistenceService.getItem(ItemKey);
        if (!data) {
            throw new Error('No data available')
        }
        const pinHash = hashSHA256(pin);
        const serializedKeys = decryptAES(data, pinHash);
        return JSON.parse(serializedKeys);
    }

}

