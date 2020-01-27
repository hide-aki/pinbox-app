import {FileRecord} from './FileRecord';
import {set, get} from 'lodash'
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

    private static splitNodePath(nodePath:string):string[] {
        return nodePath.split('/').filter(p => p && p.length > 0);
    }

    public upsertFileRecord(fileRecord: FileRecord) {
        const parts = InternalFileStructureMutator.splitNodePath(fileRecord.nodePath);
        set(this.data.records.root, parts, fileRecord.toPersistableJson());
        this.updateModifiedDate()
    }

    public renameFile(nodePath:string, newName:string) {
        const parts = InternalFileStructureMutator.splitNodePath(nodePath);
        const tmp = get(this.data.records.root, parts);
        const oldName = parts.splice(Math.max(parts.length - 1, 0));
        const parent = parts.length ? get(this.data.records.root, parts) : this.data.records.root;
        parent[newName] = tmp;
        delete parent[oldName[0]];
        this.updateModifiedDate()
    }

    private updateModifiedDate() {
        this.data.lastModified = Date.now();
        this._mutated = true
    }
}
