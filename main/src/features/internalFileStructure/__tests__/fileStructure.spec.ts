import {FileStructure, FileStructureRecord} from '../FileStructure';
import * as path from 'path';
import * as fs from 'fs';

const TestFilePathJson = path.join(__dirname, 'ifs.test.json');
const TestFilePathEncrypted = path.join(__dirname, 'ifs.test.x');

describe('FileStructure', () => {
    it('should creates Internal File Structure', async () => {
        let fileStructure = new FileStructure('privateKey', 'publicKey');
        fileStructure.addFileRecord(new FileStructureRecord('originalFilePath', 'ipfsHash'));
        fileStructure.addFileRecord(new FileStructureRecord('originalFilePath_1', 'ipfsHash_1'));
        const fsjson = fileStructure.toJSON();
        expect(fsjson).toEqual({
            "publicKey": "publicKey",
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
        let fileStructure = new FileStructure('privateKey', 'publicKey');
        fileStructure.addFileRecord(new FileStructureRecord('originalFilePath', 'ipfsHash'));
        fileStructure.addFileRecord(new FileStructureRecord('originalFilePath_1', 'ipfsHash_1'));
        await fileStructure.save(TestFilePathJson);
        expect(fs.existsSync(TestFilePathEncrypted)).toBeTruthy();
        expect(fs.existsSync(TestFilePathJson)).toBeFalsy();

    });
});
