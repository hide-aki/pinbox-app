import {createWriteStream, createReadStream} from 'fs'
import {createGzip, createGunzip} from 'zlib'
import {createHash, createCipheriv, randomBytes, createDecipheriv} from 'crypto'
import {Transform, PassThrough} from 'stream';

class AppendInitVector extends Transform {
    private hasAppended = false;

    constructor(private initializationVector: Buffer, opts?: any) {
        super(opts);
    }

    _transform(chunk: any, encoding: string, callback: (error?: Error, data?: any) => void): void {
        if (!this.hasAppended) {
            this.push(this.initializationVector);
            this.hasAppended = true;
        }
        this.push(chunk);
        callback()
    }
}

class NullStream extends Transform {

}

const getCipherKey = (secret: string): Buffer => createHash('sha256').update(secret).digest();

export interface FileCryptArgs {
    secret: string,
    inputFilePath: string,
    outputFilePath: string,
    isCompressed?: boolean
}

const CryptoParams = {
    IVByteLength: 16,
    Algorithm: 'aes-256-cbc'
};

export const encryptFileTo = async (args: FileCryptArgs): Promise<void> =>
    new Promise((resolve, reject) => {
        const {secret, inputFilePath, outputFilePath, isCompressed} = args;
        const readStream = createReadStream(inputFilePath);
        const writeStream = createWriteStream(outputFilePath);
        const gzipStream = isCompressed ? createGzip() : new PassThrough();

        const iv = randomBytes(CryptoParams.IVByteLength);
        const cipherKey = getCipherKey(secret);
        const appendIVStream = new AppendInitVector(iv);
        const cipherStream = createCipheriv(CryptoParams.Algorithm, cipherKey, iv);

        readStream
            .pipe(gzipStream)
            .pipe(cipherStream)
            .pipe(appendIVStream)
            .pipe(writeStream)
            .on('error', reject)
            .on('finish', resolve)
    });


const getInitializationVector = (inputFilePath: string): Promise<Buffer> => new Promise(((resolve, reject) => {
    const readIv = createReadStream(inputFilePath, {end: CryptoParams.IVByteLength - 1});
    let initializationVector: Buffer;
    readIv.on('data', chunk => {
        initializationVector = chunk
    });
    readIv.on('close', () => {
        resolve(initializationVector);
    });
    readIv.on('error', () => {
        reject(initializationVector);
    });
}));

export const decryptFileFrom = (args: FileCryptArgs): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const {secret, inputFilePath, outputFilePath, isCompressed} = args;
        const iv = await getInitializationVector(inputFilePath);
        const readStream = createReadStream(inputFilePath, {start: CryptoParams.IVByteLength});
        const gunzipStream = isCompressed ? createGunzip() : new PassThrough();
        const writeStream = createWriteStream(outputFilePath);

        const cipherKey = getCipherKey(secret);
        const decipherStream = createDecipheriv(CryptoParams.Algorithm, cipherKey, iv);

        readStream
            .pipe(decipherStream)
            .pipe(gunzipStream)
            .pipe(writeStream)
            .on('error', reject)
            .on('finish', resolve)
    });
