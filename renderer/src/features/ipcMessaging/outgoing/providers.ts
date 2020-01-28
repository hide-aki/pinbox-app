import {IpcMessageTypeRenameFile} from '../../../../../main/src/sharedTypings/IpcMessageTypeRenameFile';
import {IpcMessage} from '../../../../../main/src/sharedTypings/IpcMessage';
import {IpcMessageTypeFileDrop} from '../../../../../main/src/sharedTypings/IpcMessageTypeFileDrop';
import {IpcMessageTypeNewAccount} from '../../../../../main/src/sharedTypings/IpcMessageTypeNewAccount';
import {IpcMessageTypeAccountReady} from '../../../../../main/src/sharedTypings/IpcMessageTypeAccountReady';

export const MessageNames = {
    NewAccount: 'NewAccount',
    FileDrop: 'FileDrop',
    RenameFile: 'RenameFile',
    AccountReady: 'AccountReady'
};

export const RenameFileMessage = (ifsFilepath:string, newName:string) => () : IpcMessage<IpcMessageTypeRenameFile> => ({
    messageName: MessageNames.RenameFile,
    payload: {
        ifsFilepath,
        newName
    }
});

export const FileDropMessage = (ifsFilepath:string, filePaths:string[]) => () : IpcMessage<IpcMessageTypeFileDrop> => ({
    messageName: MessageNames.FileDrop,
    payload: {
        ifsFilepath,
        filePaths
    }
});

export const NewAccountMessage = (passphrase:string) => () : IpcMessage<IpcMessageTypeNewAccount> => ({
    messageName: MessageNames.NewAccount,
    payload: {
        passphrase,
    }
});

export const AccountReadyMessage = (publicKey:string) => () : IpcMessage<IpcMessageTypeAccountReady> => ({
    messageName: MessageNames.AccountReady,
    payload: {
        publicKey,
    }
});
