import {StyledTreeItem} from './StyledTreeItem';
import React from 'react';
import {FileTreeAction} from './typings/fileTreeAction';
import {voidFn} from '../../../../utils/voidFn';
import {OnDropFn} from './typings/onDropFn';
import {caseInsensitiveSortFn} from '../../../../utils/caseInsensitiveSortFn';
import {isEmptyString} from '../../../../utils/isEmptyString';

interface FileItemProps {
    label: string,
    isFile?: boolean,
    node: any,
    nodeId: string,
    onAction?: (action: FileTreeAction) => void
    onDrop: OnDropFn
}

export function FileTreeItem({label, node, nodeId, onDrop, onAction = voidFn}: FileItemProps) {
    const isFile = node.ipfsRecord !== undefined;

    const nestedFileItems = isFile
        ? null
        : Object.keys(node)
            .sort(caseInsensitiveSortFn)
            .map((k: string): JSX.Element => {
            const childFileItem = node[k];
            return <FileTreeItem
                key={k}
                nodeId={`${nodeId}/${k}`}
                node={childFileItem}
                label={k}
                onDrop={onDrop}
                onAction={onAction}
            />
        });
    return (
        <StyledTreeItem
            nodeId={nodeId}
            node={node}
            labelText={label}
            isFile={isFile}
            isRoot={isEmptyString(nodeId)}
            onAction={onAction}
            onDrop={onDrop}
        >
            {nestedFileItems}
        </StyledTreeItem>
    )
}
