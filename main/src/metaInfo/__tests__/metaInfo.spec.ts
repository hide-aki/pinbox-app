import {MetaInfo, MetaInfoFileRecord} from '../MetaInfo';

describe('MetaInfo', () => {
    it('creates and saves MetaInfo File', async () => {
        let metaInfo = new MetaInfo('account123');
        metaInfo.addFileRecord( new MetaInfoFileRecord('originalFilePath', 'ipfsHash'));
        metaInfo.addFileRecord( new MetaInfoFileRecord('originalFilePath_1', 'ipfsHash_1'));
        await metaInfo.publish();
        // expect(walker).toHaveBeenCalledTimes(1);
    });
});
