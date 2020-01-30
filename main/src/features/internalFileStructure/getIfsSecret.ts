import {derivePassword} from '../cryptography/derivePassword';

export const getIfsSecret = async (publicKey: string): Promise<string> => {
    return await derivePassword(publicKey, 'ifs.static.nonce')
};
