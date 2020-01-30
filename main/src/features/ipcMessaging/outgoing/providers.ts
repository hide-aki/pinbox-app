import {IpcMessageTypeIpfsReady} from '../../../sharedTypings/IpcMessageTypeIpfsReady';
import {IpcMessage} from '../../../sharedTypings/IpcMessage';
import {IpcMessageTypeIfsChanged} from '../../../sharedTypings/IpcMessageTypeIfsChanged';
import {IpcMessageTypeTextMessage} from '../../../sharedTypings/IpcMessageTypeTextMessage';
import {IpcMessageTypeErrorMessage} from '../../../sharedTypings/IpcMessageTypeErrorMessage';
import {IpcMessageTypeNoSecretFound} from '../../../sharedTypings/IpcMessageTypeNoSecretFound';

export const MessageNames = {
    Success: 'Success',
    Information: 'Information',
    Error: 'Error',
    IpfsReady: 'IpfsReady',
    IfsChanged: 'IfsChanged',
    NoSecretFound: 'NoSecretFound'
};

const VoidPayload = {};

export const SuccessMessage = (message:string) => () : IpcMessage<IpcMessageTypeTextMessage> => ({
    messageName: MessageNames.Success,
    payload: {
        text: message,
    }
});

export const InformationMessage = (message:string) => () : IpcMessage<IpcMessageTypeTextMessage> => ({
    messageName: MessageNames.Information,
    payload: {
        text: message,
    }
});

export const ErrorMessage = (error:Error) => () : IpcMessage<IpcMessageTypeErrorMessage> => ({
    messageName: MessageNames.Error,
    payload: {
        text: error.message,
        error,
    }
});

export const IpfsReadyMessage = (ident: any) => () : IpcMessage<IpcMessageTypeIpfsReady> => ({
    messageName: MessageNames.IpfsReady,
    payload: {
        ipfsId: ident.id,
    }
});

export const IfsChangedMessage = () => () : IpcMessage<IpcMessageTypeIfsChanged> => ({
    messageName: MessageNames.IfsChanged,
    payload: VoidPayload
});

export const NoSecretFoundMessage = () => () : IpcMessage<IpcMessageTypeNoSecretFound> => ({
    messageName: MessageNames.NoSecretFound,
    payload: VoidPayload
});
