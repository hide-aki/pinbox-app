import {handleIfsChanged} from './ifsChangedHandler';
import {handleIpfsReady} from './ipfsReadyHandler';
import {IpcMessage} from '../../../../../main/src/sharedTypings/IpcMessage';

export const MessageNames = {
    IpfsReady: 'IpfsReady',
    IfsChanged: 'IfsChanged'
};

export const handleMessage = (
    message: IpcMessage<any>
): void => {

    const {messageName, payload} = message;

    switch (messageName) {
        case MessageNames.IpfsReady:
            handleIpfsReady(payload);
            break;
        case MessageNames.IfsChanged:
            handleIfsChanged(payload);
            break;
        default:
            console.warn('Unknown message received', payload)
    }
};
