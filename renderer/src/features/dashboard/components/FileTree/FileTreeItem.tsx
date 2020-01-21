import {StyledTreeItem} from './StyledTreeItem';
import React from 'react';
import {FileTreeAction} from './typings/fileTreeAction';
import {voidFn} from '../../../../utils/voidFn';
import {ItemActions} from './StyledTreeItem/ItemActions';

interface FileItemProps {
    label: string,
    isFile?: boolean,
    node: any,
    onAction?: (action: FileTreeAction) => void
}

export function FileTreeItem({label, node, onAction = voidFn}: FileItemProps) {
    const isFile = node.ipfsHash !== undefined;

    const nestedFileItems = isFile
        ? null
        : Object.keys(node).map((k: string): JSX.Element => {
            const childFileItem = node[k];
            return <FileTreeItem key={k} node={childFileItem} label={k}/>
        });

    const actions: FileTreeAction[] = [{
        name: 'action1',
        label: 'Action 1',
        context: node
    }, {
        name: 'action2',
        label: 'Action 2',
        context: node
    }];

    return (
        <StyledTreeItem
            nodeId={label}
            labelText={label}
            isFile={isFile}
            labelInfo={node.ipfsHash}
            actions={<ItemActions actions={actions} onAction={onAction}/>}
        >
            {nestedFileItems}
        </StyledTreeItem>
    )
}
