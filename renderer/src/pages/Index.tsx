import {DropBox} from '../components/DropBox';
import React, {useContext} from 'react';
import {ElectronContext} from '../components/contexts/ElectronContext';
import {ElectronService} from '../logic/ElectronService';

const sendFilesToElectron = (service: ElectronService) => (files: FileList | null): void => {
    if (files === null) return;

    let filePaths = new Array<string>();
    for (let i = 0; i < files.length; ++i) {
        const fileItem = files.item(i);
        if (fileItem) {
            filePaths.push(fileItem.path)
        }
    }
    service.sendMessage({
        messageName: 'FileDrop',
        payload: filePaths
    })
};

export const Index: React.FC = () => {
    const electronService = useContext(ElectronContext);
    return (
        <div>
            <DropBox onDrop={sendFilesToElectron(electronService)}/>
        </div>
    )
};
