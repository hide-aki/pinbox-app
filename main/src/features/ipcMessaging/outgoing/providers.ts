import {IpcMessage} from '../../../typings/IpcMessage';

const MessageNames = {
    IpfsReady: 'IpfsReady',
    IfsChanged: 'IfsChanged'
};

export const IpfsReadyMessage = (ident: any) => () : IpcMessage => ({
    messageName: MessageNames.IpfsReady,
    payload: {
        ipfsId: ident.id,
    }
});

export const IfsChangedMessage = (ifsFilepath: string) => () : IpcMessage => ({
    messageName: MessageNames.IfsChanged,
    payload: {
        ifsFilename: ifsFilepath,
    }
});
