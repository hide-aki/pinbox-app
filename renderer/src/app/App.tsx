import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './store';
import {AppRouter} from '../routing/AppRouter';
import {ElectronProvider} from '../components/contexts/ElectronContext';
import {ElectronService} from '../services/ElectronService';
import {onAppStart} from './onAppStart';

onAppStart(store);

export const App: React.FC = () =>
    (
        // @ts-ignore
        <ElectronProvider value={new ElectronService()}>
            <StoreProvider store={store}>
                <div className="App">
                    <AppRouter/>
                </div>
            </StoreProvider>
        </ElectronProvider>
    );
