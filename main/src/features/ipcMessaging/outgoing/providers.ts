import {IpcMessage} from '../../../typings/IpcMessage';

const MessageNames = {
    IpfsReady: 'IpfsReady'
}

export const IpfsReadyMessage = (ident: any) => () : IpcMessage => ({
    messageName: MessageNames.IpfsReady,
    payload: {
        ipfsId: ident.id,
    }
});
