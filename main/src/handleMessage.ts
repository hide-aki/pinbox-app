import {ElectronMessageType} from './electron';

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
            console.log(payload);
            // encryptFile(payload);
            break;
        case MessageName.Test:
        default:
            console.log('Test', payload)
    }
};
