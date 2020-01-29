import {store} from '../../../../app/store';
import {dashboardSlice} from '../../../dashboard/slice'
import {IpcMessageTypeIfsChanged} from '../../../../../../main/src/sharedTypings/IpcMessageTypeIfsChanged';
import {selectCurrentAccount} from '../../../account/selectors';

const {actions} = dashboardSlice;

export const handleIfsChanged = async (_:IpcMessageTypeIfsChanged) => {
    const account = selectCurrentAccount(store.getState());
    const ifs = await window.rendererApi.loadIfs(account.publicKey);
    store.dispatch(actions.updateIfsStructure(ifs))
};
