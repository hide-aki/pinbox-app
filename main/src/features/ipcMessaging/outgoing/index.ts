import {MessageSendService} from './MessageSendService'


function initializeMessageService(webContents: Electron.WebContents): MessageSendService {
    const messageSendService = new MessageSendService(webContents);
    // @ts-ignore
    global.singletons.messageSendService = messageSendService;
    return messageSendService
}

export {
    initializeMessageService,
    MessageSendService
}
