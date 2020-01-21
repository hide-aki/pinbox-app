import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {FormattedMessage} from 'react-intl';
import {FileTreeAction} from './typings/fileTreeAction';
import {FileTreeItem} from './FileTreeItem';

const useStyles = makeStyles(theme => ({
        root: {
            padding: theme.spacing(4),
            minWidth: "400px",
            minHeight: "75vh",
        },
        title: {
            textAlign: 'center'
        },
        treeView: {
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: "400px",
            padding: theme.spacing(1),
        }
    })
);

interface FileTreeProps {
    tree: any
    onAction: (action: FileTreeAction) => void
}

export const FileTree = (props: FileTreeProps) => {
    const classes = useStyles();
    // @ts-ignore
    const rootNode = props.tree.root;
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h4">
                    <FormattedMessage id="dashboard.filetree.title"/>
                </Typography>
            </div>
            <div className={classes.treeView}>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon color="primary"/>}
                    defaultExpandIcon={<ChevronRightIcon color="primary"/>}
                >
                    {Object.keys(rootNode).map(k => <FileTreeItem key={k} label={k} node={rootNode[k]} onAction={props.onAction}/>)}
                </TreeView>
            </div>
        </div>
    )
};
