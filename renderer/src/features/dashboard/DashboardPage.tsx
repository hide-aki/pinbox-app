import React, {useContext, useEffect, useState} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {FileTree} from './components/FileTree';
import {ElectronContext} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import {Page} from '../../components/Page';
import {dashboardSlice} from './slice'
import {FileTreeAction} from './components/FileTree/typings/fileTreeAction';
import {useDispatch, useSelector} from 'react-redux';
import {selectIfs} from './selectors';
import {ActionNames} from './components/FileTree/StyledTreeItem/actions';
import {RenameFileDialog} from './components/RenameFileDialog';
import {isEmptyString} from '../../utils/isEmptyString';
import {FileDropMessage, RenameFileMessage} from '../ipcMessaging/outgoing/providers';
import {selectCurrentAccount} from '../account/selectors';

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
    // @ts-ignore
    const {publicKey} = useSelector(selectCurrentAccount);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     window.rendererApi.loadIfs(publicKey).then (ifs => {
    //         dispatch(dashboardSlice.actions.updateIfsStructure(ifs));
    //     });
    // }, [publicKey]);
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
                console.log('action', action.name);
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

