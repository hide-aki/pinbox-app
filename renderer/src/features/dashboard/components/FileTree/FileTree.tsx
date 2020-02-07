import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {FormattedMessage} from 'react-intl';
import {FileTreeItem} from './FileTreeItem';
import {DropZone} from './DropZone';
import {OnDropFn} from './typings/onDropFn';
import {OnActionFn} from './typings/onActionFn';

const useStyles = makeStyles(theme => ({
        root: {
        },
        treeView: {
            overflowY: 'auto',
            overflowX: 'hidden',
            minHeight: "49vh",
            maxHeight: "49vh",
            padding: theme.spacing(1),
        }
    })
);

interface TreeType {
    root: any;
}

interface FileTreeProps {
    tree: TreeType
    onAction: OnActionFn
    onDrop: OnDropFn
}

export const FileTree = (props: FileTreeProps) => {
    const classes = useStyles();
    const {onAction, onDrop, tree} = props;
    const hasFiles = Object.keys(tree.root).length > 0;
    const rootNodeId = '';

    return (
        <div className={classes.root}>
            <div className={classes.treeView}>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon color="primary"/>}
                    defaultExpandIcon={<ChevronRightIcon color="primary"/>}
                    defaultExpanded={[rootNodeId]}
                >
                    {
                        hasFiles
                            ? <FileTreeItem
                                key='root'
                                nodeId={rootNodeId}
                                label='Pinbox'
                                node={tree.root}
                                onAction={onAction}
                                onDrop={onDrop}/>
                            : <DropZone onDrop={onDrop}/>
                    }
                </TreeView>
            </div>
        </div>
    )
};
