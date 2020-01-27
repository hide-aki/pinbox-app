import {logger} from '../logger';
import {appStoreInstance} from '../../globals';
import {IfsData} from './IfsData';

export const withInternalFileStructure = (withIfsFn: (ifs: IfsData, saveIfsFn: (mutatedIfs: IfsData) => any) => any): any => {
    const appStore = appStoreInstance();
    if (appStore) {
        let ifs = appStore.get('ifs');
        return withIfsFn(ifs, (mutatedIfs) => {
            appStore.set('ifs', mutatedIfs);
        })
    } else {
        logger.debug('AppStore not available')
    }
};

