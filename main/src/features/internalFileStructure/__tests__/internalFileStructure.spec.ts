import {InternalFileStructureMutator} from '../InternalFileStructureMutator';
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
            let ifs = new InternalFileStructureMutator(mockedIfs);

            let fileRecord = new FileRecord('a/foo.png', 'ipfsHash');

            ifs.upsertFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root.a['foo.png']).toEqual({
                nonce: expect.any(String),
                created: expect.any(Number),
                ipfsHash: expect.any(String)
            })
        });

        it('should add to correct path - non-existing path', () => {
            let ifs = new InternalFileStructureMutator(mockedIfs);

            let fileRecord = new FileRecord('a/b/c/foo.png', 'ipfsHash');

            ifs.upsertFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root.a.b.c['foo.png']).toEqual({
                nonce: expect.any(String),
                created: expect.any(Number),
                ipfsHash: expect.any(String)
            })
        });

        it('should add to correct path - root', () => {
            let ifs = new InternalFileStructureMutator(mockedIfs);

            let fileRecord = new FileRecord('foo.png', 'ipfsHash');

            ifs.upsertFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root['foo.png']).toEqual({
                nonce: expect.any(String),
                created: expect.any(Number),
                ipfsHash: expect.any(String)
            })
        });
    });

    describe('renameFile', () => {

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

        it('should rename as expected', () => {
            const mutator = new InternalFileStructureMutator(mockedIfs);
            mutator.renameFile('a/b.txt', 'foo.txt');
            expect(mockedIfs.records.root.a['foo.txt']).toEqual({
                nonce: 'nonce',
                created: 'created',
                ipfsHash: 'ipfsHash'
            });
            expect(mockedIfs.records.root.a['b.txt']).not.toBeDefined()
        });

        it('should rename as expected - on root level', () => {
            const mutator = new InternalFileStructureMutator(mockedIfs);
            mutator.renameFile('a', 'bar');
            expect(mockedIfs.records.root.bar).toEqual({
                    'b.txt': {
                        nonce: 'nonce',
                        created: 'created',
                        ipfsHash: 'ipfsHash'
                    }
                }
            );
            expect(mockedIfs.records.root.a).not.toBeDefined()
        })
    });
});
