import {FileRecord} from './FileRecord';
import {set} from 'lodash'
import {IfsData} from './IfsData';

/**
 * Class that mutates the Ifs data object.
 */
export class InternalFileStructureMutator {
    private _mutated: boolean = false;

    constructor(public data: IfsData) {
    }

    get mutated(): boolean {
        return this._mutated;
    }

    public upsertFileRecord(fileRecord: FileRecord) {
        const parts: any = fileRecord.nodePath.split('/').filter(p => p && p.length > 0);
        set(this.data.records.root, parts, fileRecord.toPersistableJson());
        this.updateModifiedDate()
    }

    private updateModifiedDate() {
        this.data.lastModified = Date.now();
        this._mutated = true
    }
}
