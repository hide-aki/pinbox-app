import {encryptFileTo, FileCryptArgs} from './fileCrypt';
import {withIpfs} from '../ipfs/withIpfs';
import {logger} from '../logger';
import * as fs from 'fs';
import {randomString} from './randomString';
import { join, dirname } from 'path';

export const __handleFile = (file: string): void => {
    withIpfs(async (ipfs: any) => {
        const args: FileCryptArgs = {
            secret: 'MySecretT',
            inputFilePath: file,
            outputFilePath: join(dirname(file), randomString())
        };
        try {
            await encryptFileTo(args);
            logger.debug('Adding file', args.inputFilePath);
            const result = await ipfs.addFromFs(args.outputFilePath);
            logger.debug(`Added file: ${args.outputFilePath}, Ipfs: ${JSON.stringify(result)}`)
            fs.unlinkSync(args.outputFilePath);
        } catch (e) {
            logger.error(e);
        }
    })
};




export const handleFileDrop = (files: string[]) => {
    files.forEach(__handleFile);
}
