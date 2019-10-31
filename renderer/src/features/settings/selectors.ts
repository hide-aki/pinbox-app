import {ISettings} from '../../services/SettingsService';

export const selectPeer = (state:any): string => state.settings.peer;
export const selectLanguage = (state:any): string => state.settings.language;
export const selectSettings = (state:any): ISettings => state.settings || {};
