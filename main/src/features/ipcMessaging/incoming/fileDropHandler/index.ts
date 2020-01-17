import {encryptFileTo, FileCryptArgs} from '../../../cryptography/fileCrypt';
import {withIpfs} from '../../../ipfs/withIpfs';
import {logger} from '../../../logger';
import * as fs from 'fs';
import {randomString} from '../../../../util/randomString';
import {join, dirname} from 'path';
import {fileWalk} from './fileWalk';
import {handleException} from '../../../exceptions';

const handleFile = (file: string): void => {
    withIpfs(async (ipfs: any) => {
        const args: FileCryptArgs = {
            // TODO: use derived secret
            secret: 'MySecretT',
            inputFilePath: file,
            outputFilePath: join(dirname(file), randomString())
        };
        try {
            await encryptFileTo(args);
            logger.debug('Adding file', args.inputFilePath);
            const result = await ipfs.addFromFs(args.outputFilePath);
            logger.debug(`Added file: ${args.outputFilePath}, Ipfs: ${JSON.stringify(result)}`);
            fs.unlinkSync(args.outputFilePath);
        } catch (e) {
            handleException(e)
        }
    })
};


export const handleFileDrop = (files: string[]) => {
    files.forEach((file: string) => {
        fileWalk(file, handleFile)
    });
};
