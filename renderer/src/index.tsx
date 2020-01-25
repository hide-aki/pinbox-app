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

declare global {
    interface Window {
        rendererApi: RendererApi;
        require: any;
    }
}

const electronService = new ElectronService();
electronService.onMessage(handleMessage);

ReactDOM.render(
    <ElectronProvider value={electronService}>
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </StoreProvider>
    </ElectronProvider>
    , document.getElementById('root'));


