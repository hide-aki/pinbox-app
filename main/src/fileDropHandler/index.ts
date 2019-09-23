import {FileCryptArgs} from './fileCrypt';
import {pool} from 'workerpool';
import {join} from 'path';

const fileWorkerPool = pool(join(__dirname, './fileWorker.js'));

export const __handleFile = (file: string): Promise<void> =>
    new Promise((resolve, reject) => {
        const args: FileCryptArgs = {
            secret: 'MySecretT',
            inputFilePath: file,
            outputFilePath: `${file}.x`
        };

        fileWorkerPool.proxy()
            .then(proxy => proxy.encryptFileTo(args))
            .catch(reject)
            .then(() => {
                fileWorkerPool.terminate();
                resolve()
            });
    });

export const handleFileDrop = (files: string[]) => files.forEach(__handleFile);
