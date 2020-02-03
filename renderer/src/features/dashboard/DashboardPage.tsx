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
import {isEmptyString} from '../../utils/isEmptyString';
import {FileDropMessage, RenameFileMessage} from '../ipcMessaging/outgoing/providers';
import {CapacityChart} from './components/CapacityChart';
import Big from 'big.js'

const {actions} = dashboardSlice;

const dispatchFileDropMessage = (service: ElectronService) => (files: FileList | null, nodePath: string): void => {
    if (files === null) return;

    let filePaths = new Array<string>();
    for (let i = 0; i < files.length; ++i) {
        const fileItem = files.item(i);
        if (fileItem) {
            filePaths.push(fileItem.path)
        }
    }
    service.sendMessage(FileDropMessage(nodePath, filePaths))
};

const dispatchRenameFileMessage = (service: ElectronService) => (nodeId: string, newName: string): void => {
    service.sendMessage(RenameFileMessage(nodeId, newName))
};

export const DashboardPage: React.FC = () => {
    const electronService = useContext(ElectronContext);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const ifs = useSelector(selectIfs);

    const handleDrop = (files: FileList | null, nodePath: string): any => {
        dispatchFileDropMessage(electronService)(files, nodePath)
    };

    const handleAction = (action: FileTreeAction): void => {
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

    const handleRenameClose = (newName: string | null): void => {
        if (selectedNode && !isEmptyString(newName)) {
            // @ts-ignore
            dispatchRenameFileMessage(electronService)(selectedNode, newName)
        }
        setSelectedNode(null);
        setRenameDialogOpen(false);
    };

    return (
        <Page>
            <RenameFileDialog
                isOpen={renameDialogOpen}
                nodeId={selectedNode}
                onClose={handleRenameClose}
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
                                <CapacityChart capacities={
                                    {synced:Big(100), uploading:Big(0), none:Big(0)}
                                } subscriptions={[]}/>
                            </React.Fragment>
                        )
                        }
                    </Paper>
                </Grid>
                <Grid item xs={8}>
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
                <Grid item xs={4}>
                    <Paper>
                        {ifs && (
                            <React.Fragment>
                                <h2>Details</h2>
                            </React.Fragment>
                        )
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
};

