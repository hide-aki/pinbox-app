import {InternalFileStructure} from '../InternalFileStructure';
import {FileRecord} from '../FileRecord';
import {IfsData} from '../IfsData';

describe('InternalFileStructure', () => {
    describe('addFileRecord', () => {
        let mockedIfs: IfsData;
        beforeEach(() => {
            mockedIfs = {
                lastModified: 0,
                records: {
                    root: {
                        a: {
                            'b.txt': {
                                nonce: 'nonce',
                                created: 'created',
                                ipfsHash: 'ipfsHash'
                            }
                        }
                    }
                }
            };
        });

        it('should add to correct path - existing path', () => {
            let ifs = new InternalFileStructure(mockedIfs);

            let fileRecord = new FileRecord('a/foo.png', 'ipfsHash');

            ifs.addFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root.a['foo.png']).toEqual({
                nonce: expect.any(String),
                created: expect.any(Number),
                ipfsHash: expect.any(String)
            })
        });

        it('should add to correct path - non-existing path', () => {
            let ifs = new InternalFileStructure(mockedIfs);

            let fileRecord = new FileRecord('a/b/c/foo.png', 'ipfsHash');

            ifs.addFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root.a.b.c['foo.png']).toEqual({
                nonce: expect.any(String),
                created: expect.any(Number),
                ipfsHash: expect.any(String)
            })
        });

        it('should add to correct path - root', () => {
            let ifs = new InternalFileStructure(mockedIfs);

            let fileRecord = new FileRecord('foo.png', 'ipfsHash');

            ifs.addFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root['foo.png']).toEqual({
                nonce: expect.any(String),
                created: expect.any(Number),
                ipfsHash: expect.any(String)
            })
        });
    })
});
