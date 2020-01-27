import {FileRecord} from '../../../internalFileStructure/FileRecord';
import {InternalFileStructureMutator} from '../../../internalFileStructure/InternalFileStructureMutator';
import {withInternalFileStructure} from '../../../internalFileStructure/withInternalFileStructure';

export const updateInternalFileSystem = (fileRecord: FileRecord): void => {
    withInternalFileStructure((ifs, saveIfs) => {
        const fileStructure = new InternalFileStructureMutator(ifs);
        fileStructure.upsertFileRecord(fileRecord);
        saveIfs(fileStructure.data)
    })
};
