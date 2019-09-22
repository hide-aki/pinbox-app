import {ElectronMessageType} from './electron';
import {encryptFile} from './encryptFile';

const MessageName = {
    Test: 'Test',
    FileDrop: 'FileDrop'
};

export const handleMessage = (
    message: ElectronMessageType
): void => {

    const {messageName, payload} = message;

    switch (messageName) {
        case MessageName.FileDrop:
            encryptFile(payload);
            break;
        case MessageName.Test:
        default:
            console.log(payload)
    }
};
