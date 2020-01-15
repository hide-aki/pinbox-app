import {createSlice} from '@reduxjs/toolkit';
import {defaultPeer} from '../../app/burstPeers';
import {settingsService} from '../../services/SettingsService';

const detectedLanguage = navigator.language.split(/[-_]/)[0];
const settings = settingsService.getSettings();

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        language: settings ? settings.language : detectedLanguage,
        peer: settings ? settings.peer : defaultPeer
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            settingsService.storeSettings(state)
        },
        setPeer: (state, action) => {
            state.peer = action.payload;
            settingsService.storeSettings(state)
        }
    }
});
