import {store} from '../../../../app/store';
import {dashboardSlice} from '../../../dashboard/slice'
import {IpcMessageTypeIfsChanged} from '../../../../../../main/src/sharedTypings/IpcMessageTypeIfsChanged';

const {actions} = dashboardSlice;

export const handleIfsChanged = async (payload:IpcMessageTypeIfsChanged) => {
    const ifs = window.rendererApi.loadIfs();
    store.dispatch(actions.updateIfsStructure(ifs))
};
