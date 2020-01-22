import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {FormattedMessage} from 'react-intl';
import {FileTreeAction} from './typings/fileTreeAction';
import {FileTreeItem} from './FileTreeItem';
import {DropZone} from './DropZone';

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
            // maxHeight: "400px",
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
    const rootNode = props.tree.root;
    // const rootNode = {};
    const fileTreeItems = Object.keys(rootNode);

    const hasFiles = fileTreeItems.length > 0;

    const handleDrop = (files: FileList|null, event: React.DragEvent<HTMLDivElement>): any  => {
        console.log(files, event)
    };

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
                            ? fileTreeItems.map(k =>
                                // @ts-ignore
                                <FileTreeItem key={k} label={k} node={rootNode[k]} onAction={props.onAction}/>)
                            : <DropZone onDrop={handleDrop}/>
                    }
                </TreeView>
            </div>
        </div>
    )
};
