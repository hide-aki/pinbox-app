import {handleFileDrop} from './fileDropHandler';
import {handleNewAccount} from './newAccountHandler';
import {IpcMessage} from '../../../sharedTypings/IpcMessage';
import {logger} from '../../logger';
import {handleRenameFile} from './renameFileHandler';

const MessageNames = {
    FileDrop: 'FileDrop',
    NewAccount: 'NewAccount',
    RenameFile: 'RenameFile'
};

export const handleMessage = (
    message: IpcMessage<any>
): void => {

    const {messageName, payload} = message;
    logger.debug(`Incoming IPC Message: ${messageName}`);

    switch (messageName) {
        case MessageNames.FileDrop:
            handleFileDrop(payload);
            break;
        case MessageNames.NewAccount:
            handleNewAccount(payload);
            break;
        case MessageNames.RenameFile:
            handleRenameFile(payload);
            break;
        default:
            logger.warn(`Unknown incoming message: ${messageName}`)
    }
};
