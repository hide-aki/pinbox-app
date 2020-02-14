import {Widget} from '../../../../app/components/Widget';
import {FileTree} from '../../components/FileTree';
import React, {useContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {ifsSelector} from '../../selectors';
import {FileTreeAction} from '../../components/FileTree/typings/fileTreeAction';
import {ActionNames} from '../../components/FileTree/StyledTreeItem/actions';
import {isEmptyString} from '../../../../utils/isEmptyString';
import {ElectronService} from '../../../../services/ElectronService';
import {FileDropMessage, RenameFileMessage} from '../../../ipcMessaging/outgoing/providers';
import {ElectronContext} from '../../../../app/components/contexts/ElectronContext';
import {useIntl} from 'react-intl';
import {translate} from '../../../../utils/translate';
import {RenameFileDialog} from '../../components/RenameFileDialog';

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


export const FileStructureWidget: React.FC = () => {
    const electronService = useContext(ElectronContext);
    const t = translate(useIntl());
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const ifs = useSelector(ifsSelector);

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
        <React.Fragment>
            <RenameFileDialog
                isOpen={renameDialogOpen}
                nodeId={selectedNode}
                onClose={handleRenameClose}
            />
            <Widget title={t("dashboard.filetree.title")}
                    subtitle={t("dashboard.filetree.subtitle")}>
                <FileTree
                    tree={ifs.records}
                    onAction={handleAction}
                    onDrop={handleDrop}
                />
            </Widget>
        </React.Fragment>
    )
};
