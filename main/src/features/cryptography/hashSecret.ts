import {argon2id, hash as argonHash} from 'argon2';

const Argon2Delimiter = '$';


interface HashedResult {
    raw: string,
    hash: string,
    salt: string,
    type: string,
    v: number,
    m: number,
    t: number,
    p: number,
}

function extractArgon2Parts(argon2Hash: string): HashedResult {
    let parts = argon2Hash.split(Argon2Delimiter);

    const getValue = (assignment: string): number => +assignment.split('=')[1];

    // $argon2id$v=19$m=4096,t=3,p=1$AQIDBAUGBwg$4pyIOZpE6LBnNQxJOUgOUcJNMYhziSgKw8YaowA6Nd4
    const type = parts[1];
    const v = getValue(parts[2]);

    const params = parts[3].split(',');
    const m = getValue(params[0]);
    const t = getValue(params[1]);
    const p = getValue(params[2]);
    const salt = parts[4];
    const hash = parts[5];
    return {
        raw: argon2Hash,
        hash,
        salt,
        type,
        v,
        m,
        t,
        p,
    }
}

export async function hashSecret(secret: string, buffer?: Buffer): Promise<HashedResult> {
    const hash = await argonHash(secret, {
        salt: buffer || undefined,
        type: argon2id,
    });
    return extractArgon2Parts(hash)
}
