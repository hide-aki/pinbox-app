import {handleFileDrop} from './fileDropHandler';
import {handleNewAccount} from './newAccountHandler';
import {IpcMessage} from '../../../typings/IpcMessage';

const MessageNames = {
    Test: 'Test',
    FileDrop: 'FileDrop',
    NewAccount: 'NewAccount',
};

export const handleMessage = (
    message: IpcMessage
): void => {

    const {messageName, payload} = message;

    switch (messageName) {
        case MessageNames.FileDrop:
            handleFileDrop(payload);
            break;
        case MessageNames.NewAccount:
            handleNewAccount(payload);
            break;
        case MessageNames.Test:
        default:
            console.log('Test Test', payload)
    }
};
