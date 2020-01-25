import {handleFileDrop} from './fileDropHandler';
import {handleNewAccount} from './newAccountHandler';
import {IpcMessage} from '../../../sharedTypings/IpcMessage';

const MessageNames = {
    FileDrop: 'FileDrop',
    NewAccount: 'NewAccount',
};

export const handleMessage = (
    message: IpcMessage<any>
): void => {

    const {messageName, payload} = message;

    switch (messageName) {
        case MessageNames.FileDrop:
            handleFileDrop(payload);
            break;
        case MessageNames.NewAccount:
            handleNewAccount(payload);
            break;
    }
};
