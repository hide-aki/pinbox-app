import {FileRecord} from '../../../internalFileStructure/FileRecord';
import {appStoreInstance} from '../../../../globals';
import {InternalFileStructureMutator} from '../../../internalFileStructure/InternalFileStructureMutator';

export const addFileToInternalFileStructure = (fileRecord: FileRecord): void => {
    let appStore = appStoreInstance();
    let ifs = appStore.get('ifs');
    const fileStructure = new InternalFileStructureMutator(ifs);
    fileStructure.upsertFileRecord(fileRecord);
    appStore.set('ifs', fileStructure.data);
};
