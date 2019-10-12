import {SecureKeyService} from '../SecureKeyService';
import {IPersistenceService} from '../../typings/IPersistenceService';

class MockPersistenceService implements IPersistenceService {
    public data: any = {};

    getItem(key: string): string | null {
        return this.data[key];
    }

    removeItem(key: string): void {
        delete this.data[key];
    }

    storeItem(key: string, serializedData: string): void {
        this.data[key] = serializedData
    }
}

describe('SecurePrivateKeyService', () => {
    let service: SecureKeyService;
    let persistenceService = new MockPersistenceService();
    beforeAll(() => {
        service = new SecureKeyService(persistenceService);
    });

    describe('storePrivateKey', () => {

        it('should store private key encrypted', () => {
            const Passphrase = 'Super Heroic Passphrase';
            service.storeKeys('mySecretPin', Passphrase);
            let item = persistenceService.getItem('k');
            expect(item).toBeDefined();
            expect(item).not.toContain(Passphrase);
            // @ts-ignore
            expect(btoa(item) ).not.toContain(Passphrase)
        });

        it('should throw error on invalid inputs - invalid pin', () => {
            try{
                service.storeKeys('', 'Super Heroic Passphrase');
            }catch(e){
                expect(e.message).toContain('Invalid pin')
            }
        });

        it('should throw error on invalid inputs - invalid passphrase', () => {
            try{
                service.storeKeys('mySecretPin', '');
            }catch(e){
                expect(e.message).toContain('Invalid passphrase')
            }
        });

    });

    describe('getPrivateKey', () => {
        it('should get private key in clear text', () => {
            const Passphrase = 'Super Heroic Passphrase';
            service.storeKeys('mySecretPin', Passphrase);
            let keys = service.getKeys('mySecretPin');
            expect(keys.publicKey).toBeDefined();
            expect(keys.agreementPrivateKey).toBeDefined();
            expect(keys.signPrivateKey).toBeDefined();
        })
    })
});
