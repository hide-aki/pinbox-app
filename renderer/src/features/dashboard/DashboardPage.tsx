import {DropBox} from './DropBox';
import React, {useContext} from 'react';
import {ElectronContext} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import {Page} from '../../components/Page';
import {Grid, Paper, Typography} from '@material-ui/core';
import {FileTree} from './FileTree';
import {FormattedMessage, useIntl} from 'react-intl';

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
                <Grid item xs={12} md={6}>
                    <Paper>
                        <FileTree tree={mockedFileTreeStruct}/>
                    </Paper>
                </Grid>
                {/*<Grid item xs={12} md={6}>*/}
                {/*    <Paper>*/}
                {/*        <DropBox onDrop={sendFilesToElectron(electronService)}/>*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
            </Grid>
        </Page>
    )
};

