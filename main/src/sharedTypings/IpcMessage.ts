export interface IpcMessage<T> {
    messageName: string;
    payload: T;
}
