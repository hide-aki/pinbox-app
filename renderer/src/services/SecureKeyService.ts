import {PersistenceService} from './PersistenceService';
import {IPersistenceService} from '../typings/IPersistenceService';
import {generateMasterKeys, encryptAES, decryptAES, hashSHA256, Keys} from '@burstjs/crypto'
const ItemKey = 'k';

export class SecureKeyService {

    constructor(private persistenceService: IPersistenceService = new PersistenceService()) {
    }

    storeKeys(pin: string, passphrase: string) {

        if (!(pin && pin.length)) {
            throw new Error('Invalid pin')
        }

        if (!(passphrase && passphrase.length)) {
            throw new Error('Invalid passphrase')
        }

        const keys = generateMasterKeys(passphrase);
        const hash = hashSHA256(pin);
        const keysStr = JSON.stringify(keys);
        this.persistenceService.storeItem(ItemKey, encryptAES(keysStr, hash));
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

    hasKeysStored(): boolean {
        return !!this.persistenceService.getItem(ItemKey);
    }

}

