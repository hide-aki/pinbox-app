import {IpcChannelName} from '../../../constants';
import {IpcMessage} from '../../../typings/IpcMessage';
import {IpcMessageProvider} from '../../../typings/IpcMessageProvider';

const MessageNames = {
    Success: 'Success',
    Error: 'Error',
    Information: 'Info',
};

export class MessageSendService {

    constructor(private webContents : Electron.WebContents, private channel: string = IpcChannelName) {}

    public send(message : IpcMessage | IpcMessageProvider): void {
        console.log('sending...')
        // @ts-ignore
        this.webContents.send(this.channel, message.messageName ? message : message())
    }

    public sendSuccessMessage(messageText: string){
        this.send({
            messageName: MessageNames.Success,
            payload: messageText
        })
    }

    public sendErrorMessage(e: Error){
        this.send({
            messageName: MessageNames.Error,
            payload: e
        })
    }

    public sendInfoMessage(messageText: string){
        this.send({
            messageName: MessageNames.Information,
            payload: messageText
        })
    }
}

