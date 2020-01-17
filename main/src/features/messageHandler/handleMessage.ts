import {ElectronMessageType} from '../../electron';
import {handleFileDrop} from './fileDropHandler';
import {handleNewAccount} from './newAccountHandler';

const MessageName = {
    Test: 'Test',
    FileDrop: 'FileDrop',
    NewAccount: 'NewAccount',
};

export const handleMessage = (
    message: ElectronMessageType
): void => {

    const {messageName, payload} = message;

    switch (messageName) {
        case MessageName.FileDrop:
            handleFileDrop(payload);
            break;
        case MessageName.NewAccount:
            handleNewAccount(payload);
            break;
        case MessageName.Test:
        default:
            console.log('Test Test', payload)
    }
};
