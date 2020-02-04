import {IfsData} from '../../../main/src/sharedTypings/IfsData';
import Big from 'big.js'
import {PredicateFn} from '../typings/PredicateFn';
import {IfsFileRecordData} from '../../../main/src/sharedTypings/IfsFileRecordData';

export class InternalFileStructureService {
    constructor(private _ifsData: IfsData) {
    }

    private static isFileRecord(obj: object): boolean {
        // @ts-ignore
        return obj && obj.ipfsRecord !== undefined
    }

    public walk(node: object, applyFn: (fileRecord: IfsFileRecordData) => any): any {

        if (InternalFileStructureService.isFileRecord(node)) {
            // @ts-ignore
            return applyFn(node)
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

    calculateCapacityByPredicate(predicate: PredicateFn<IfsFileRecordData>): Big {
        let size = new Big(0);
        this.walk(this._ifsData.records.root, fileRecord => {
            if(predicate(fileRecord)){
                size = size.plus(fileRecord.ipfsRecord[0].size)
            }
        });
        return size;
    }
}
