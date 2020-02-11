
export enum MessageType {
    None = 'none',
    Success = 'success',
    Information = 'info',
    Error = 'error',
}

export interface NotificationMessage {
    type: MessageType,
    text: string
}
