import React, {useContext} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {FileTree} from './components/FileTree';
import {ElectronContext} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import {Page} from '../../components/Page';
import {voidFn} from '../../utils/voidFn';

const sendFilesToElectron = (service: ElectronService) => (files: FileList | null): void => {
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
        payload: filePaths
    })
};

const mockedFileTreeStruct = {
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
};


export const DashboardPage: React.FC = () => {
    const electronService = useContext(ElectronContext);
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
                        <FileTree tree={mockedFileTreeStruct} onAction={voidFn}/>
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
};
