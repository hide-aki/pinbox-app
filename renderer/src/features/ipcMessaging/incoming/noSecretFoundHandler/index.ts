import {IpcMessageTypeNoSecretFound} from '../../../../../../main/src/sharedTypings/IpcMessageTypeNoSecretFound';
import {RouteProviders} from '../../../../routing/routes';
import {store} from '../../../../app/store';
import {applicationSlice} from '../../../../app/slice';

export const handleNoSecretFound = (payload:IpcMessageTypeNoSecretFound) => {
    store.dispatch(applicationSlice.actions.reset());
    window.location.replace(RouteProviders.Login())
};
