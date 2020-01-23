import {createSlice} from '@reduxjs/toolkit';
import {addFileNamesToTree} from './components/FileTree/helper/addFileNamesToTree';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        ifs: {root: {}}
    },
    reducers: {
        addFile: (state, action) => {
            const {
                payload: {
                    files, nodePath
                }
            } = action;
            if(!nodePath){
                addFileNamesToTree(state.ifs, '', files)
            }

            // const pathTokens = nodePath.split('/');
            // pathTokens.forEach( () => {
            //
            // })
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
