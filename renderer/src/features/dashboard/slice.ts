import {createSlice} from '@reduxjs/toolkit';
import {IfsData} from '../../../../main/src/sharedTypings/IfsData';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        ifs: {records: {root: {}}} as IfsData,
    },
    reducers: {
        updateIfsStructure: (state, action) => {
            state.ifs = action.payload;
        }
    }
});
