import React from 'react';
import {ElectronProvider} from './components/contexts/ElectronContext';
import {ElectronService} from './logic/ElectronService';
import {AppRouter} from './routes/AppRouter';

const App: React.FC = () =>
    (
        // @ts-ignore
        <ElectronProvider value={new ElectronService()}>
            <div className="App">
                <AppRouter/>
            </div>
        </ElectronProvider>
    );

export default App;
