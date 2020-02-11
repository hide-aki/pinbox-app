import {NotificationMessage} from '../typings/NotificationMessage';

export const selectIsIpfsReady = (state:any): boolean => state.application.isIpfsReady;
export const selectHasEnteredPin = (state:any): boolean => state.application.hasEnteredPin;
export const selectUserInactive = (state:any): boolean => state.application.userInactive;
export const messageSelector = (state:any): NotificationMessage => state.application.message;
