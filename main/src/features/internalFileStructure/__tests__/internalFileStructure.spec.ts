import {existsSync}  from 'fs';
import {FileRecord} from '../FileRecord';
import {IfsData} from '../../../sharedTypings/IfsData';
import {InternalFileStructure} from '../InternalFileStructure';
import * as path from 'path';
import {IpfsRecord} from '../../../sharedTypings/IpfsRecord';

const MockedIpfsRecord: IpfsRecord = {
    hash: 'hash', path: 'path', size: 0
};

describe('InternalFileStructure', () => {
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
                            ipfsRecord: [MockedIpfsRecord],
                            status: 'local',
                        }
                    }
                }
            }
        };
    });

    describe('addFileRecord', () => {
        it('should add to correct path - existing path', () => {
            let ifs = new InternalFileStructure(mockedIfs);
            let fileRecord = new FileRecord('a/foo.png', [MockedIpfsRecord]);

            ifs.upsertFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root.a['foo.png'].nonce).toEqual(expect.any(String));
            expect(ifs.data.records.root.a['foo.png'].created).toEqual(expect.any(Number));
            expect(ifs.data.records.root.a['foo.png'].ipfsRecord).toEqual([MockedIpfsRecord]);
            expect(ifs.data.records.root.a['foo.png'].status).toBe('none');
        });

        it('should add to correct path - non-existing path', () => {
            let ifs = new InternalFileStructure(mockedIfs);

            let fileRecord = new FileRecord('a/b/c/foo.png', [MockedIpfsRecord]);

            ifs.upsertFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root.a.b.c['foo.png'].nonce).toEqual(expect.any(String));
            expect(ifs.data.records.root.a.b.c['foo.png'].created).toEqual(expect.any(Number));
            expect(ifs.data.records.root.a.b.c['foo.png'].ipfsRecord).toEqual([MockedIpfsRecord]);
            expect(ifs.data.records.root.a.b.c['foo.png'].status).toBe('none');
        });

        it('should add to correct path - root', () => {
            let ifs = new InternalFileStructure(mockedIfs);

            let fileRecord = new FileRecord('foo.png', [MockedIpfsRecord]);

            ifs.upsertFileRecord(fileRecord);

            expect(ifs.data).toBeDefined();
            expect(ifs.data.lastModified).not.toBe(0);
            expect(ifs.data.records.root['foo.png'].nonce).toEqual(expect.any(String));
            expect(ifs.data.records.root['foo.png'].created).toEqual(expect.any(Number));
            expect(ifs.data.records.root['foo.png'].ipfsRecord).toEqual([MockedIpfsRecord]);
            expect(ifs.data.records.root['foo.png'].status).toBe('none');
        });
    });

    describe('renameFileRecord', () => {
        it('should rename as expected', () => {
            const mutator = new InternalFileStructure(mockedIfs);
            mutator.renameFileRecord('a/b.txt', 'foo.txt');
            expect(mockedIfs.records.root.a['foo.txt']).toEqual({
                nonce: 'nonce',
                created: 'created',
                ipfsRecord: [MockedIpfsRecord],
                status: 'local'
            });
            expect(mockedIfs.records.root.a['b.txt']).not.toBeDefined()
        });

        it('should rename as expected - on root level', () => {
            const mutator = new InternalFileStructure(mockedIfs);
            mutator.renameFileRecord('a', 'bar');
            expect(mockedIfs.records.root.bar).toEqual({
                    'b.txt': {
                        nonce: 'nonce',
                        created: 'created',
                        ipfsRecord: [MockedIpfsRecord],
                        status: 'local'
                    }
                }
            );
            expect(mockedIfs.records.root.a).not.toBeDefined()
        })
    });

    describe('loadFromLocal/saveToLocal', () => {
        const TestSecret = 'TestSecret';
        const TestPath = path.join(__dirname, 'test.ifs');

       it('should load a saved IFS - No Encryption', async () => {
           const internalFileStructure = new InternalFileStructure(mockedIfs);
           const outputFilePath = await internalFileStructure.saveToLocal(TestPath);
           const wasWritten = existsSync(outputFilePath);
           expect(wasWritten).toBeTruthy();

           const loadedIfs = await InternalFileStructure.loadFromLocal(outputFilePath);
           expect(loadedIfs.data).toEqual(mockedIfs);

       });

       it('should load a saved IFS - With Encryption', async () => {
           const internalFileStructure = new InternalFileStructure(mockedIfs);
           const outputFilePath = await internalFileStructure.saveToLocal(TestPath, TestSecret);
           const wasWritten = existsSync(outputFilePath);
           expect(wasWritten).toBeTruthy();

           const loadedIfs = await InternalFileStructure.loadFromLocal(outputFilePath, TestSecret);
           expect(loadedIfs.data).toEqual(mockedIfs);
       });
    });

});
