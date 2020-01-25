import {StyledTreeItem} from './StyledTreeItem';
import React from 'react';
import {FileTreeAction} from './typings/fileTreeAction';
import {voidFn} from '../../../../utils/voidFn';
import {ItemActions} from './StyledTreeItem/ItemActions';
import {OnDropFn} from './typings/onDropFn';
import {getNodePath} from './helper/getNodePath';

interface FileItemProps {
    label: string,
    isFile?: boolean,
    node: any,
    nodeId: string,
    onAction?: (action: FileTreeAction) => void
    onDrop: OnDropFn
}

const ignorePrivateProperty = (propName: string): boolean => !propName.startsWith('__');

export function FileTreeItem({label, node, nodeId, onDrop, onAction = voidFn}: FileItemProps) {
    const isFile = node.ipfsHash !== undefined;

    const nestedFileItems = isFile
        ? null
        : Object.keys(node)
            .map((k: string): JSX.Element => {
            const childFileItem = node[k];
            return <FileTreeItem
                key={k}
                nodeId={`${nodeId}/${k}`}
                node={childFileItem}
                label={k}
                onDrop={onDrop}
            />
        });
    return (
        <StyledTreeItem
            nodeId={nodeId}
            labelText={label}
            isFile={isFile}
            labelInfo={node.ipfsHash}
            actions={<ItemActions actions={[]} onAction={onAction}/>}
            onDrop={onDrop}
        >
            {nestedFileItems}
        </StyledTreeItem>
    )
}
