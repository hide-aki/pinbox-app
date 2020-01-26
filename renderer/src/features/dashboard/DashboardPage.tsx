import React, {useContext, useState} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {FileTree} from './components/FileTree';
import {ElectronContext} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import {Page} from '../../components/Page';
import {dashboardSlice} from './slice'
import {FileTreeAction} from './components/FileTree/typings/fileTreeAction';
import {useSelector} from 'react-redux';
import {selectIfs} from './selectors';
import {ActionNames} from './components/FileTree/StyledTreeItem/actions';
import {RenameFileDialog} from './components/RenameFileDialog';

const {actions} = dashboardSlice;

const sendFilesToElectron = (service: ElectronService) => (files: FileList | null, nodePath: string): void => {
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

export const DashboardPage: React.FC = () => {
    const electronService = useContext(ElectronContext);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const ifs = useSelector(selectIfs);

    const handleDrop = (files: FileList | null, nodePath: string): any => {
        sendFilesToElectron(electronService)(files, nodePath)
    };

    const handleAction = (action: FileTreeAction): void => {
        console.log('handleAction', action);
        switch (action.name) {
            case ActionNames.Rename:
                setSelectedNode(action.context);
                setRenameDialogOpen(true);
                break;
            case ActionNames.Remove:
                break;
            default:
                console.warn('Unknown action:', action.name)
        }
    };

    return (
        <Page>
            <RenameFileDialog
                isOpen={renameDialogOpen}
                nodeId={selectedNode}
            />
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
                spacing={2}
            >
                <Grid item xs={12}>
                    <Paper>
                        {ifs && (
                            <React.Fragment>
                                <FileTree
                                    tree={ifs.records}
                                    onAction={handleAction}
                                    onDrop={handleDrop}
                                />
                            </React.Fragment>
                        )
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
};

