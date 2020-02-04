import {IfsFileRecordStatus} from './IfsFileRecordStatus';
import {IpfsRecord} from './IpfsRecord';

export interface IfsFileRecordData {
    nonce: string;
    created: number;
    status: IfsFileRecordStatus;
    ipfsRecord: IpfsRecord[];
}
