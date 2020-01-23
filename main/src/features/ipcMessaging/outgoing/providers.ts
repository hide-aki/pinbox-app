import {IpcMessage} from '../../../common/typings/IpcMessage';

const MessageNames = {
    IpfsReady: 'IpfsReady',
    IfsChanged: 'IfsChanged'
};

interface IpfsReadyType {
    ipfsId: string
}

interface IfsChangedType {
    ifsFilepath: string
}

export const IpfsReadyMessage = (ident: any) => () : IpcMessage<IpfsReadyType> => ({
    messageName: MessageNames.IpfsReady,
    payload: {
        ipfsId: ident.id,
    }
});


export const IfsChangedMessage = (ifsFilepath: string) => () : IpcMessage<IfsChangedType> => ({
    messageName: MessageNames.IfsChanged,
    payload: {
        ifsFilepath,
    }
});
