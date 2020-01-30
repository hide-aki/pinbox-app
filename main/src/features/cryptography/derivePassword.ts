import {getPassword} from 'keytar';
import {KeyStoreServiceName} from '../../constants';
import {hashSecret} from './hashSecret';
import {NoSecretError} from '../exceptions';

export async function derivePassword(publicKey: string, nonce: string): Promise<string> {
    try {
        const privateKey = await getPassword(KeyStoreServiceName, publicKey);
        if (!privateKey) throw new NoSecretError('No Key');
        return hashSecret(privateKey, nonce);
    } catch (e) {
        throw new NoSecretError(e.message)
    }
}
