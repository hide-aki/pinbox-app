import {unlink} from 'fs'
import {withIpfs} from '../../../ipfs/withIpfs';
import {encryptFileTo, FileCryptArgs} from '../../../cryptography/fileCrypt';
import {dirname, join} from "path";
import {randomString} from '../../../../utils/randomString';
import {logger} from '../../../logger';
import {handleException} from '../../../exceptions';
import {derivePassword} from '../../../cryptography/derivePassword';
import {voidFn} from '../../../../utils/voidFn';

const wait = (millies: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, millies)
    })
};

export const addToIpfs = async (file: string, nonce: string): Promise<string> => withIpfs(async (ipfs: any): Promise<string> => {
    let encryptedFile : string|null = null;
    try {
        let password = await derivePassword(nonce);
        const args: FileCryptArgs = {
            secret: password,
            inputFilePath: file,
            // TODO: use apps path
            outputFilePath: join(dirname(file), randomString())
        };
        logger.debug(`Adding file: ${args.inputFilePath}`);
        await encryptFileTo(args);
        encryptedFile = args.outputFilePath;
        logger.debug('Successfully encrypted');
        const result = await ipfs.addFromFs(args.outputFilePath);
        logger.debug(`Added to IPFS:  ${JSON.stringify(result)}`);
        return Promise.resolve(result)
    } catch (e) {
        handleException(e);
        return Promise.reject(e)
    } finally {
        if(encryptedFile !== null){
            logger.debug(`Removing encrypted File: ${encryptedFile}`);
            await unlink(encryptedFile, voidFn)
        }
    }
});

