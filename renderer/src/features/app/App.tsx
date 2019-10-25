import React from 'react';
import {ElectronProvider} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import {AppRouter} from '../../routing/AppRouter';
import {Provider as StoreProvider} from 'react-redux';
import {store} from '../../store';

const App: React.FC = () =>
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

export default App;
