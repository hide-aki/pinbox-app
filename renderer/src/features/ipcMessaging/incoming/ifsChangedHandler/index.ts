import {store} from '../../../../app/store';
import {dashboardSlice} from '../../../dashboard/slice'
import {IpcMessageTypeIfsChanged} from '../../../../../../main/src/sharedTypings/IpcMessageTypeIfsChanged';
import {currentAccountSelector} from '../../../account/selectors';
import {RouteProviders} from '../../../../routing/routes';

const {actions} = dashboardSlice;

export const handleIfsChanged = async (_: IpcMessageTypeIfsChanged) => {
    try {
        const account = currentAccountSelector(store.getState());
        const ifs = await window.rendererApi.loadIfs(account.publicKey);
        store.dispatch(actions.updateIfsStructure(ifs))
    } catch (e) {
        console.error('handleIfsChanged',e)
        // window.location.href = RouteProviders.Login()
    }
};
