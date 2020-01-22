import {createSlice} from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        ifs: {root: {}}
    },
    reducers: {
        addFile: (state, action) => {

            console.log('addFile', action);
            // 1. update the local structure
            // 2. send data to main thread
            // A. need a listener that updates the state
            return state
        },
        removeFile: (state, action) => {

            // 1. update the local structure
            // 2. send data to main thread
            // A. need a listener that updates the state
            return state
        },
        renameFile: (state, action) => {

            // 1. update the local structure
            // 2. send data to main thread
            // A. need a listener that updates the state
            return state
        },
        updateFileState: (state, action) => {

            // A. need a listener that updates the state
            return state
        }
    }
});
