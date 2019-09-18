import React from 'react';
//import { IpcRenderer, IpcRendererEvent, app, ipcRenderer} from 'electron' ;
// const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.
//
// let ipcRenderer : IpcRenderer  = electron.ipcRenderer ;
//
// ipcRenderer.on('response' , (event: IpcRendererEvent, args: any[]) => {
//     console.log('got', args)
// });

import {ElectronService} from './ElectronService';

const electronService = new ElectronService();

let ipcRenderer = electronService.ipcRenderer;

const App: React.FC = () =>
    (
        <div className="App">
            <button onClick={e => ipcRenderer && ipcRenderer.send('channel', {title: 'hi', content: 'hello this is my message'})}>
                Click me Test
            </button>
        </div>
    );

export default App;
