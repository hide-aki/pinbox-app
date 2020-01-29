import {InternalFileStructure} from './InternalFileStructure';
import {getIfsPath} from './getIfsPath';
import {existsSync} from "fs";
import {logger} from '../logger';
import {internalFileStructureInstance} from '../../globals';

export async function fetchInternalFileStructure(publicKey: string): Promise<InternalFileStructure> {
    let ifs = internalFileStructureInstance();
    if (ifs) {
        return ifs;
    }
    ifs = new InternalFileStructure();
    const ifsLocalFilePath = getIfsPath(publicKey);
    if (existsSync(ifsLocalFilePath)) {
        logger.debug(`Loading IFS: ${ifsLocalFilePath}`);
        ifs = await InternalFileStructure.loadFromLocal(ifsLocalFilePath)
    } else {
        logger.debug(`Create new IFS`);
        ifs = new InternalFileStructure()
    }
    // @ts-ignore
    global.ifs = ifs;
    logger.debug('IFS initialized');
    return ifs
}
