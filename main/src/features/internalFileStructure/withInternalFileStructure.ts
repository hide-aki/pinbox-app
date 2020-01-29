import {logger} from '../logger';
import {InternalFileStructure} from './InternalFileStructure';
import {fetchInternalFileStructure} from './fetchInternalFileStructure';
import {currentPublicKeyInstance} from '../../globals';

export const withInternalFileStructure = async (withIfsFn: (ifs: InternalFileStructure) => any): Promise<any> => {
    try{
        const internalFileStructure = await fetchInternalFileStructure(currentPublicKeyInstance());
        return withIfsFn(internalFileStructure)
    }catch(e){
        logger.error(`IFS exception: ${e.message}`)
    }
};

