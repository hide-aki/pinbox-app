import {FileRecord} from './FileRecord';
import {set} from 'lodash'
import {IfsData} from './IfsData';

/**
 * Class that mutates the Ifs data object.
 */
export class InternalFileStructureMutator {
    private _mutated: boolean = false;
    constructor(public data: IfsData) {}

    get mutated(): boolean {
        return this._mutated;
    }

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
        this.data.lastModified = Date.now();
        this._mutated = true
    }
}
