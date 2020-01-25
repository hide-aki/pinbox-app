import React, {useContext} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {FileTree} from './components/FileTree';
import {ElectronContext} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import {Page} from '../../components/Page';
import {dashboardSlice} from './slice'
import {FileTreeAction} from './components/FileTree/typings/fileTreeAction';
import {jsonToNavigableJson} from './components/FileTree/helper/jsonToNavigableJson';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentAccount} from '../account/selectors';
import {selectIfs} from './selectors';

const {actions} = dashboardSlice;

const sendFilesToElectron = (service: ElectronService) => (files: FileList | null, nodePath:string): void => {
    if (files === null) return;

    let filePaths = new Array<string>();
    for (let i = 0; i < files.length; ++i) {
        const fileItem = files.item(i);
        if (fileItem) {
            filePaths.push(fileItem.path)
        }
    }
    service.sendMessage({
        messageName: 'FileDrop',
        payload: {
            filePaths,
            nodePath,
        }
    })
};

const mockedFileTreeStruct = jsonToNavigableJson({
    root: {
        'some path': {
            'deeperPath': {
                'file1.txt': {
                    ipfsHash: 'ipfsHash_1',
                }
            }
        },
        'other path': {
            'file2.txt': {
                ipfsHash: 'ipfsHash_2',
            },
            'file3.txt': {
                ipfsHash: 'ipfsHash_3',
            },
            'next path': {
                'file4.txt': {
                    ipfsHash: 'ipfsHash_4',
                },
            }
        }
    }
});

export const DashboardPage: React.FC = () => {
    const electronService = useContext(ElectronContext);
    const ifs = useSelector(selectIfs);
    const handleDrop = (files: FileList | null, nodePath: string): any => {
        sendFilesToElectron(electronService)(files, nodePath)
    };

    const handleAction = (action: FileTreeAction): void => {
        console.log('handleAction', action)
    };

    return (
        <Page>
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
                spacing={2}
            >
                <Grid item xs={12}>
                    <Paper>
                        <FileTree
                            tree={ifs.records}
                            onAction={handleAction}
                            onDrop={handleDrop}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
};

