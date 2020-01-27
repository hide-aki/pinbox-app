import {unlinkSync} from 'fs'
import {getPassword} from 'keytar'
import {withIpfs} from '../../../ipfs/withIpfs';
import {encryptFileTo, FileCryptArgs} from '../../../cryptography/fileCrypt';
import {dirname, join} from "path";
import {randomString} from '../../../../util/randomString';
import {logger} from '../../../logger';
import {handleException} from '../../../exceptions';
import {KeyStoreServiceName} from '../../../../constants';
import {appStoreInstance} from '../../../../globals';
import {hashSecret} from '../../../cryptography/hashSecret';

const wait = (millies: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, millies)
    })
};

async function generatePassword(nonce: string) : Promise<string> {
    const store = appStoreInstance();
    if(!store) return Promise.reject("No store available yet");
    let publicKey = store.get('publicKey');
    const privateKey = await getPassword(KeyStoreServiceName, publicKey);
    // FIXME: Fallback if privateKey cannot be fetched! -> message to reforce login!
    const hashedResult = await hashSecret(`${nonce}.${privateKey}`);
    return hashedResult.hash;
}

export const addToIpfs = async (file: string, nonce:string): Promise<string> => withIpfs(async (ipfs: any): Promise<string> => {
    let password = await generatePassword(nonce);
    const args: FileCryptArgs = {
        secret: password,
        inputFilePath: file,
        // TODO: use apps path
        outputFilePath: join(dirname(file), randomString())
    };
    try {
        await encryptFileTo(args);
        logger.debug(`Adding file: ${args.inputFilePath}`);
        const result = await ipfs.addFromFs(args.outputFilePath);
        logger.debug(`Added file: ${args.outputFilePath}, Ipfs: ${JSON.stringify(result)}`);
        unlinkSync(args.outputFilePath);
        return Promise.resolve(result)
    } catch (e) {
        handleException(e);
        return Promise.reject(e)
    }
});

