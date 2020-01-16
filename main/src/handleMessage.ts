import {ElectronMessageType} from './electron';
import {handleFileDrop} from './features/fileDropHandler';

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
            handleFileDrop(payload);
            break;
        case MessageName.Test:
        default:
            console.log('Test Test', payload)
    }
};
