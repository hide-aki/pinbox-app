import {FileStructure, FileStructureRecord} from '../FileStructure';

describe('FileStructure', () => {
    it('should generate initial state of file record', async () => {
        const fsr = new FileStructureRecord('originalFilePath', 'ipfsHash');
        expect(fsr.nonce).toBeDefined();
        expect(fsr.nonce.length).toBeGreaterThan(10);
        expect(fsr.created).toBeDefined();
    });
});
