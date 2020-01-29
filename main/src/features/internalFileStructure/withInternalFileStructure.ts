import {logger} from '../logger';
import {appStoreInstance, currentPublicKeyInstance} from '../../globals';
import {IfsData} from './IfsData';
import {InternalFileStructure} from './InternalFileStructure';

export const withInternalFileStructure = (withIfsFn: (ifs: IfsData, saveIfsFn: (mutatedIfs: IfsData) => any) => any): any => {

    // TODO: Implement new InternalFileStructure!
    const appStore = appStoreInstance();
    const publicKey = currentPublicKeyInstance();
    if (appStore) {
        let ifs = appStore.get('ifs');
        return withIfsFn(ifs, (mutatedIfs) => {
            appStore.set('ifs', mutatedIfs);
        })
    } else {
        logger.debug('AppStore not available')
    }
};

