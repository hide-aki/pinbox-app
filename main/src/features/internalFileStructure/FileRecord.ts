import {randomString} from '../../utils/randomString';
import {IpfsRecord} from '../../sharedTypings/IpfsRecord';

type FileRecordStatus = 'local' | 'pinned' | 'expired'

export class FileRecord {
    public nonce: string;
    public created: number;
    public status: FileRecordStatus;

    constructor(
        public nodePath: string,
        public ipfsRecord: IpfsRecord[],
    ) {
        this.created = Date.now();
        this.nonce = randomString();
        this.status = 'local'
    }

    public static fromPersistedJson(obj: object): FileRecord {
        // @ts-ignore
        if (obj.ipfsRecord === undefined) {
            throw new Error("Passed object does not seem to be a FileRecord object")
        }

        // @ts-ignore
        const fileRecord = new FileRecord('', obj.ipfsRecord);
        // @ts-ignore
        fileRecord.status = obj.status;
        // @ts-ignore
        fileRecord.nonce = obj.nonce;
        // @ts-ignore
        fileRecord.created = obj.created;

        return fileRecord;
    }

    public toPersistableJson(): object {
        return {
            nonce: this.nonce,
            created: this.created,
            ipfsRecord: this.ipfsRecord,
            status: this.status
        };
    }
}
