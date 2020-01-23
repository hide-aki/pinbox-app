import {IpcMessage} from '../common/typings/IpcMessage';

export type IpcMessageProvider<T> = () => IpcMessage<T>;
