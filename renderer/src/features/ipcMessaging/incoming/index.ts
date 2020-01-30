import {handleIfsChanged} from './ifsChangedHandler';
import {handleIpfsReady} from './ipfsReadyHandler';
import {IpcMessage} from '../../../../../main/src/sharedTypings/IpcMessage';
import {handleNoSecretFound} from './noSecretFoundHandler';

export const MessageNames = {
    IpfsReady: 'IpfsReady',
    IfsChanged: 'IfsChanged',
    NoSecretFound: 'NoSecretFound'
};

export const handleMessage = (
    message: IpcMessage<any>
): void => {

    const {messageName, payload} = message;
    console.log('Incoming message', messageName);
    switch (messageName) {
        case MessageNames.IpfsReady:
            handleIpfsReady(payload);
            break;
        case MessageNames.IfsChanged:
            handleIfsChanged(payload);
            break;
        case MessageNames.NoSecretFound:
            handleNoSecretFound(payload);
            break;
        default:
            console.warn('Unknown message received', payload)
    }
};
