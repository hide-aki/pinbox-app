import {DropBox} from './DropBox';
import React, {useContext} from 'react';
import {ElectronContext} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import {Page} from '../../components/Page';

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

export const DropboxPage: React.FC = () => {
    const electronService = useContext(ElectronContext);
    electronService.onMessage(console.log);
    return (
        <Page>
            <DropBox onDrop={sendFilesToElectron(electronService)}/>
        </Page>
    )
};

