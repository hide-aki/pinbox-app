import {IpcMessageTypeRenameFile} from '../../../../../main/src/sharedTypings/IpcMessageTypeRenameFile';
import {IpcMessage} from '../../../../../main/src/sharedTypings/IpcMessage';
import {IpcMessageTypeFileDrop} from '../../../../../main/src/sharedTypings/IpcMessageTypeFileDrop';
import {IpcMessageTypeNewAccount} from '../../../../../main/src/sharedTypings/IpcMessageTypeNewAccount';

export const MessageNames = {
    NewAccount: 'NewAccount',
    FileDrop: 'FileDrop',
    RenameFile: 'RenameFile',
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
