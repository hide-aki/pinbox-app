import {createSlice} from 'redux-starter-kit';

// const detectedLanguage = navigator.language.split(/[-_]/)[0]
const detectedLanguage = 'de'

export const settingsSlice = createSlice({
    slice: 'settings',
    initialState: {
        language: detectedLanguage
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload
        }
    }
});
