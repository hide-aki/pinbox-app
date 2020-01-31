import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './app';
import {ElectronProvider} from './components/contexts/ElectronContext';
import {ElectronService} from './services/ElectronService';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './app/store';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './theming/theme';
import {handleMessage} from './features/ipcMessaging/incoming';
import {RendererApi} from '../../main/src/sharedTypings/RendererApi';
import {applicationSlice} from './app/slice';
import debounce from 'lodash.debounce'

declare global {
    interface Window {
        rendererApi: RendererApi;
        require: any;
    }
}

const electronService = new ElectronService();
electronService.onMessage(handleMessage);

let activityTimer:any = null;
const checkUserActivity = debounce(() => {
    store.dispatch(applicationSlice.actions.setUserInactive(false));
    if (activityTimer) {
        clearTimeout(activityTimer)
    }
    activityTimer = setTimeout(() => {
        store.dispatch(applicationSlice.actions.setUserInactive(true))
    }, 30 * 1000) // TODO: make it configurable
}, 250);

document.addEventListener('mousemove', checkUserActivity);
document.addEventListener('keypress', checkUserActivity);

ReactDOM.render(
    <ElectronProvider value={electronService}>
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </StoreProvider>
    </ElectronProvider>
    , document.getElementById('root'));


