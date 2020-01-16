import {FileStructure, FileStructureRecord} from '../FileStructure';

describe('FileStructure', () => {
    it('creates and saves MetaInfo File', async () => {
        let metaInfo = new FileStructure('account123');
        metaInfo.addFileRecord( new FileStructureRecord('originalFilePath', 'ipfsHash'));
        metaInfo.addFileRecord( new FileStructureRecord('originalFilePath_1', 'ipfsHash_1'));
    });
});
