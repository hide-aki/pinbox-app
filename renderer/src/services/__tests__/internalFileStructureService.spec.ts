// @ts-ignore

import {InternalFileStructureService} from '../InternalFileStructureService';
import {FileRecord} from '../../../../main/src/features/internalFileStructure/FileRecord';

const MockIfsData = {
    lastModified: 1234,
    records: {
        root: {
            "burst": {
                "BAT.jpg": {
                    "nonce": "GGhr7h9mIKB2_DJjDyCI2lCjrpx+mlXPIanwDoRuhSA=",
                    "created": 1580675098674,
                    "status": "synced",
                    "ipfsRecord": [
                        {
                            "path": "mOwWh0a3vbw8xljVcVZbN7WQRI04srhgMMSZCjRUAt4=",
                            "hash": "QmRk5t1djVzD9mVixskP9JLC865BLhdq8B5nDLabS5pPJQ",
                            "size": 100000
                        }
                    ]
                },
                "BAT.pdf": {
                    "nonce": "z7EgnVuO8FEzeqkWZfJbPMyUrZQuekbjru+xfRbbhsE=",
                    "created": 1580675098772,
                    "status": "synced",
                    "ipfsRecord": [
                        {
                            "path": "RkNIhG09WbduRoCjYbRYigltXDU101b0UpeCv7ft6sM=",
                            "hash": "QmPHgYxJz4EihuHusemF9m2YFgpBv7YEChup8d4K1Ya1vG",
                            "size": 500
                        }
                    ]
                },
                "BAT.foo": {
                    "nonce": "z7EgnVuO8FEzeqkWZfJbPMyUrZQuekbjru+xfRbbhsE=",
                    "created": 1580675098772,
                    "status": "local",
                    "ipfsRecord": [
                        {
                            "path": "RkNIhG09WbduRoCjYbRYigltXDU101b0UpeCv7ft6sM=",
                            "hash": "QmPHgYxJz4EihuHusemF9m2YFgpBv7YEChup8d4K1Ya1vG",
                            "size": 1000
                        }
                    ]
                },
            },
        },
    }
};

describe('InternalFileStructureService', () => {
    describe('calculateOverallCapacity', () => {
        it('should calculate all entries sizes correctly', () => {
            const service = new InternalFileStructureService(MockIfsData);
            const size = service.calculateOverallCapacity();
            expect(size.eq(101500)).toBeTruthy()
        });

        it('should return 0 if no entry was found', () => {
            const service = new InternalFileStructureService({
                lastModified: 1234,
                records: {
                    root: {}
                }
            });
            const size = service.calculateOverallCapacity();
            expect(size.eq(0)).toBeTruthy()
        })
    });

    describe('calculateCapacityByPredicate', () => {
        it('should calculate only entries with status "synced"', () => {
            const service = new InternalFileStructureService(MockIfsData);
            const size = service.calculateCapacityByPredicate((fileRecord: FileRecord): boolean => fileRecord.status === 'synced');
            expect(size.eq(100500)).toBeTruthy()
        });
    })
});
