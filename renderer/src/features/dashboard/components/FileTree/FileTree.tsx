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
            padding: theme.spacing(4),
            minHeight: "70vh",
        },
        title: {
            textAlign: 'center'
        },
        treeView: {
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: "70vh",
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
    const fileTreeItems = Object.keys(tree.root);
    const hasFiles = fileTreeItems.length > 0;

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h4">
                    <FormattedMessage id={`dashboard.filetree.${hasFiles ? 'title' : 'nofiles'}`}/>
                </Typography>
            </div>
            <div className={classes.treeView}>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon color="primary"/>}
                    defaultExpandIcon={<ChevronRightIcon color="primary"/>}
                >
                    {
                        fileTreeItems.length
                            ? fileTreeItems.map((k) =>
                                <FileTreeItem
                                    key={k}
                                    nodeId={k}
                                    label={k}
                                    node={tree.root[k]}
                                    onAction={onAction}
                                    onDrop={onDrop}/>
                            )
                            : <DropZone onDrop={onDrop}/>
                    }
                </TreeView>
            </div>
        </div>
    )
};
