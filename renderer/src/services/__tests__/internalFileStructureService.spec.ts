// @ts-ignore

import {InternalFileStructureService} from '../InternalFileStructureService';

const MockIfsData = {
    lastModified: 1234,
    records: {
        root: {
            burst: {
                "BAT.jpg": {
                    "nonce": "GGhr7h9mIKB2_DJjDyCI2lCjrpx+mlXPIanwDoRuhSA=",
                    "created": 1580675098674,
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
                    "ipfsRecord": [
                        {
                            "path": "RkNIhG09WbduRoCjYbRYigltXDU101b0UpeCv7ft6sM=",
                            "hash": "QmPHgYxJz4EihuHusemF9m2YFgpBv7YEChup8d4K1Ya1vG",
                            "size": 500
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
            expect(size.eq(100500)).toBeTruthy()
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
    })
});
