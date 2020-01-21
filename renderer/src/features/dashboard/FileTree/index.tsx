import React from 'react';
import {makeStyles} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {TreeItem} from '@material-ui/lab';

const useStyles = makeStyles({
    root: {
        border: "1px solid black"
    },
});


interface FileItemProps {
    label: string,
    isFolder?: boolean,
    node: any
}

function FileItem({isFolder, label, node}: FileItemProps) {
    const isFile = node.ipfsHash !== undefined;
    const nestedFileItems = isFile
        ? null
        : Object.keys(node).map((k: string): JSX.Element => {
            const childFileItem = node[k];
            return <FileItem key={k} node={childFileItem} label={k} isFolder={!childFileItem.ipfsHash}/>
        });
    return <TreeItem nodeId={label} label={label}>{
        nestedFileItems
    }</TreeItem>
}

interface FileTreeProps {
    tree: any
}

export const FileTree = (props: FileTreeProps) => {
    const classes = useStyles();
    // @ts-ignore
    const rootNode = props.tree.root;
    return (
        <div className={classes.root}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                <FileItem label="root" node={rootNode}/>
            </TreeView>
        </div>
    )
};
