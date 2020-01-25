import {createSlice} from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        ifs: { records: { root: {} } }
    },
    reducers: {
        updateIfsStructure: (state, action) => {
            state.ifs = action.payload;
            return state;
        }
    }
});
