import {FileRecord} from './FileRecord';
import {set} from 'lodash'
import {IfsData} from './IfsData';

export class InternalFileStructure {
    constructor(public data: IfsData) {}

    public addFileRecord(fileRecord: FileRecord) {
        const parts: any = fileRecord.nodePath.split('/');
        const data = {
            nonce: fileRecord.nonce,
            created: fileRecord.created,
            ipfsHash: fileRecord.ipfsHash,
        };
        set(this.data.records.root, parts, data);
        this.updateModifiedDate()
    }

    private updateModifiedDate() {
        this.data.lastModified = Date.now()
    }
}
