import {FileRecord} from '../../../internalFileStructure/FileRecord';
import {InternalFileStructureMutator} from '../../../internalFileStructure/InternalFileStructureMutator';
import {withInternalFileStructure} from '../../../internalFileStructure/withInternalFileStructure';
import {InternalFileStructure} from '../../../internalFileStructure/InternalFileStructure';
import {currentPublicKeyInstance} from '../../../../globals';

export const updateInternalFileSystem = (fileRecord: FileRecord): void => {
    withInternalFileStructure((ifs, saveIfs) => {
        const fileStructure = new InternalFileStructure(ifs);
        fileStructure.upsertFileRecord(fileRecord);
        saveIfs(fileStructure.data)
    })
};
