import Button from '@material-ui/core/Button';
import {FormattedMessage} from 'react-intl';
import React, {useContext} from 'react';
import {ElectronContext} from './contexts/ElectronContext';

export const DemoButton: React.FC = () => {
    const electronService = useContext(ElectronContext);
    let ipcRenderer = electronService.ipcRenderer
    return (
        <Button variant="contained" color="primary" onClick={e => ipcRenderer && ipcRenderer.send('channel', {
            title: 'hi',
            content: 'hello this is my message'
        })}>
            <FormattedMessage id="button.click_me"
                              defaultMessage={"Click me!"}
            />
        </Button>
    )
};
