import {handleFileDrop} from './fileDropHandler';
import {handleNewAccount} from './newAccountHandler';
import {IpcMessage} from '../../../sharedTypings/IpcMessage';
import {logger} from '../../logger';
import {handleRenameFile} from './renameFileHandler';
import {handleAccountReady} from './accountReadyHandler';

const MessageNames = {
    FileDrop: 'FileDrop',
    NewAccount: 'NewAccount',
    RenameFile: 'RenameFile',
    AccountReady: 'AccountReady'
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
        case MessageNames.AccountReady:
            handleAccountReady(payload);
            break;
        default:
            logger.warn(`Unknown incoming message: ${messageName}`)
    }
};
