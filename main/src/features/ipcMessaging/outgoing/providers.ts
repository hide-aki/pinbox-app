import {IpcMessage} from '../../../typings/IpcMessage';

const MessageNames = {
    IpfsReady: 'IpfsReady',
    IfsUpdated: 'IfsUpdated'
};

export const IpfsReadyMessage = (ident: any) => () : IpcMessage => ({
    messageName: MessageNames.IpfsReady,
    payload: {
        ipfsId: ident.id,
    }
});

export const IfsUpdatedMessage = (ifsFilepath: string) => () : IpcMessage => ({
    messageName: MessageNames.IpfsReady,
    payload: {
        ifsFilename: ifsFilepath,
    }
});
