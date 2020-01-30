import {createHmac} from 'crypto'
export function hashSecret(secret: string, nonce: string): string {
    const hmac = createHmac('sha512', secret);
    hmac.update(nonce);
    return hmac.digest().toString('base64')
}
