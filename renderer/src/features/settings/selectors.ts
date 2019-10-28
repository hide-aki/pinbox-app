import {ISettings} from '../../services/SettingsService';

export const selectLanguage = (state:any): string => state.settings.language;
export const selectSettings = (state:any): ISettings => state.settings || {};
