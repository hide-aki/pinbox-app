import {createSelector} from '@reduxjs/toolkit';
import {InternalFileStructureService} from '../../services/InternalFileStructureService';
import {IfsData} from '../../../../main/src/sharedTypings/IfsData';
import {IfsCapacity} from './components/CapacityChart/typings/IfsCapacity';
import {IfsFileRecordStatus} from '../../../../main/src/sharedTypings/IfsFileRecordStatus';
import {IfsFileRecordData} from '../../../../main/src/sharedTypings/IfsFileRecordData';

const statusPredicate = (status: IfsFileRecordStatus) => (fileRecord: IfsFileRecordData): boolean => fileRecord.status === status;

export const ifsSelector = (state: any): IfsData => state.dashboard.ifs;
export const capacitySelector = createSelector(
    ifsSelector,
    (ifs: IfsData): IfsCapacity => {
        const service = new InternalFileStructureService(ifs);
        const none = service.calculateCapacityByPredicate(statusPredicate('none'));
        const uploading = service.calculateCapacityByPredicate(statusPredicate('uploading'));
        const synced = service.calculateCapacityByPredicate(statusPredicate('synced'));
        return {
            none, synced, uploading
        }
    }
);


