import {IfsData} from '../../../main/src/sharedTypings/IfsData';
import {FileRecord} from '../../../main/src/features/internalFileStructure/FileRecord';
import Big from 'big.js'
import {PredicateFn} from '../typings/PredicateFn';

/*
export const fileWalk = async (filePath: string, applyFn: (file: string, depth: number) => Promise<any>, depth: number = 0): Promise<any> => {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
        const dirFiles = await readdir(filePath);
        for (let i = 0; i < dirFiles.length; ++i) {
            const dirFile = dirFiles[i];
            if (dirFile === '.' || dirFile === '..') continue;
            await fileWalk(join(filePath, dirFile), applyFn, depth + 1)
        }
    } else {
        return await applyFn(filePath, depth);
    }
};

 */
export class InternalFileStructureService {
    constructor(private _ifsData: IfsData) {
    }

    private static isFileRecord(obj: object): boolean {
        // @ts-ignore
        return obj.ipfsRecord !== undefined
    }

    public walk(node: object, applyFn: (fileRecord: FileRecord) => any): any {
        if (InternalFileStructureService.isFileRecord(node)) {
            const fileRecord = FileRecord.fromPersistedJson(node);
            return applyFn(fileRecord)
        } else {
            // @ts-ignore
            Object.keys(node).forEach(propName => this.walk(node[propName], applyFn))

        }
    }

    calculateOverallCapacity(): Big {
        let size = new Big(0);
        this.walk(this._ifsData.records.root, fileRecord => {
            size = size.plus(fileRecord.ipfsRecord[0].size)
        });
        return size;
    }

    calculateCapacityByPredicate(predicate: PredicateFn<FileRecord>): Big {
        let size = new Big(0);
        this.walk(this._ifsData.records.root, fileRecord => {
            if(predicate(fileRecord)){
                size = size.plus(fileRecord.ipfsRecord[0].size)
            }
        });
        return size;
    }
}
