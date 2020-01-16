import {FileStructure, FileStructureRecord} from '../FileStructure';
import * as path from 'path';
import * as fs from 'fs';

const TestFilePath = path.join(__dirname, 'ifs.test.json');

describe('FileStructure', () => {
    it('creates and saves Internal File Structure', async () => {
        let metaInfo = new FileStructure('account123');
        metaInfo.addFileRecord( new FileStructureRecord('originalFilePath', 'ipfsHash'));
        metaInfo.addFileRecord( new FileStructureRecord('originalFilePath_1', 'ipfsHash_1'));
        await metaInfo.save(TestFilePath);

        expect(fs.existsSync(TestFilePath)).toBeTruthy();
        expect(fs.existsSync(TestFilePath + '.encode')).toBeTruthy();

    });
});
