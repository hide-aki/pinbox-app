import {FileStructure, FileStructureRecord} from '../FileStructure';
import * as path from 'path';
import * as fs from 'fs';

const TestFilePath = path.join(__dirname, 'ifs.test.json');

describe('FileStructure', () => {
    it('should creates Internal File Structure', async () => {
        let fileStructure = new FileStructure('account123');
        fileStructure.addFileRecord(new FileStructureRecord('originalFilePath', 'ipfsHash'));
        fileStructure.addFileRecord(new FileStructureRecord('originalFilePath_1', 'ipfsHash_1'));
        const fsjson = fileStructure.toJSON();
        expect(fsjson).toEqual({
            "accountId": "account123",
            "created": expect.any(Number),
            "updated": expect.any(Number),
            "fileRecords": {
                "ipfsHash": {
                    "originalFilePath": "originalFilePath",
                    "ipfsHash": "ipfsHash",
                    "created": expect.any(Number),
                    "nonce": expect.any(String)
                },
                "ipfsHash_1": {
                    "originalFilePath": "originalFilePath_1",
                    "ipfsHash": "ipfsHash_1",
                    "created": expect.any(Number),
                    "nonce": expect.any(String)
                }
            }
        });
    });

    it('should save Internal File Structure', async () => {
        let metaInfo = new FileStructure('account123');
        metaInfo.addFileRecord(new FileStructureRecord('originalFilePath', 'ipfsHash'));
        metaInfo.addFileRecord(new FileStructureRecord('originalFilePath_1', 'ipfsHash_1'));
        await metaInfo.save(TestFilePath);

        expect(fs.existsSync(TestFilePath)).toBeFalsy();
        expect(fs.existsSync(TestFilePath + '.encode')).toBeTruthy();

    });
});
