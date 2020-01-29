import {logger} from '../logger';
import {InternalFileStructure} from './InternalFileStructure';
import {fetchInternalFileStructure} from './fetchInternalFileStructure';
import {selectCurrentPublicKey} from '../stores/transient/selectors';

export const withInternalFileStructure = async (withIfsFn: (ifs: InternalFileStructure) => any): Promise<any> => {
    try{
        const pubKey = selectCurrentPublicKey();
        const internalFileStructure = await fetchInternalFileStructure(pubKey);
        return withIfsFn(internalFileStructure)
    }catch(e){
        logger.error(`IFS exception: ${e.message}`)
    }
};

