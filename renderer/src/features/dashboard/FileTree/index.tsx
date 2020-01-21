import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {StyledTreeItem} from './StyledTreeItem';
import {FormattedMessage} from 'react-intl';

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
        }
    })
);

interface FileItemProps {
    label: string,
    isFile?: boolean,
    node: any
}

function FileItem({label, node}: FileItemProps) {
    const isFile = node.ipfsHash !== undefined;

    const nestedFileItems = isFile
        ? null
        : Object.keys(node).map((k: string): JSX.Element => {
            const childFileItem = node[k];
            return <FileItem key={k} node={childFileItem} label={k}/>
        });

    return <StyledTreeItem nodeId={label} labelText={label} isFile={isFile} labelInfo={node.ipfsHash}>{
        nestedFileItems
    }</StyledTreeItem>
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
                    {Object.keys(rootNode).map(k => <FileItem key={k} label={k} node={rootNode[k]}/>)}
                </TreeView>
            </div>
        </div>
    )
};
