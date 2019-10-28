import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './app';
import {ElectronProvider} from './components/contexts/ElectronContext';
import {ElectronService} from './services/ElectronService';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './app/store';

declare global {
    interface Window {
        require: any;
    }
}

ReactDOM.render(
    <ElectronProvider value={new ElectronService()}>
        <StoreProvider store={store}>
        <App/>
        </StoreProvider>
    </ElectronProvider>
    , document.getElementById('root'));


