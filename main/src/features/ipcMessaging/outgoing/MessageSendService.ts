import {IpcChannelName} from '../../../constants';
import {IpcMessage} from '../../../sharedTypings/IpcMessage';
import {ErrorMessage, InformationMessage, SuccessMessage} from './providers';

export type IpcMessageProvider<T> = () => IpcMessage<T>;

export class MessageSendService {

    constructor(private webContents: Electron.WebContents, private channel: string = IpcChannelName) {
    }

    public send(messageProvider: IpcMessageProvider<any>): void {
        this.webContents.send(this.channel, messageProvider())
    }

    public sendSuccessMessage(messageText: string) {
        this.send(SuccessMessage(messageText))
    }

    public sendErrorMessage(e: Error) {
        this.send(ErrorMessage(e))
    }

    public sendInfoMessage(messageText: string) {
        this.send(InformationMessage(messageText))
    }
}

