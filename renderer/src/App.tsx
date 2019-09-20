import React from 'react';
import {DropBox} from './components/DropBox';
import {ElectronProvider} from './components/contexts/ElectronContext';
import {DemoButton} from './components/DemoButton';
import {ElectronService} from './logic/ElectronService';

const App: React.FC = () =>
    (
        // @ts-ignore
        <ElectronProvider value={new ElectronService()}>
            <div className="App">
                <DropBox/>
                <DemoButton/>
            </div>
        </ElectronProvider>
    );

export default App;
