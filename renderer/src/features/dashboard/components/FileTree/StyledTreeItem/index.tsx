import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {TreeItem} from '@material-ui/lab';
import {ItemFile} from './ItemFile';
import {ItemFolder} from './ItemFolder';
import {OnDropFn} from '../typings/onDropFn';
import {ItemRoot} from './ItemRoot';
import {OnActionFn} from '../typings/onActionFn';

const useTreeItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.secondary,
        '&:focus > $content': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            borderRadius: '2px'
        },
    },
}));

interface StyledTreeItemProps {
    nodeId: string;
    node: any;
    labelText: string;
    onDrop: OnDropFn;
    onAction: OnActionFn;
    isFile: boolean;
    isRoot: boolean;
}

const getItem = ({isFile, isRoot}: StyledTreeItemProps): React.FC<any> => {
    if (isRoot) return ItemRoot;
    return isFile ? ItemFile : ItemFolder;
};

export const StyledTreeItem: React.FC<StyledTreeItemProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const Item = getItem(props);
    const {node, nodeId, labelText, isFile, isRoot, onAction, onDrop, ...other} = props;
    return (
        <TreeItem
            {...other}
            className={classes.root}
            nodeId={nodeId}
            label={<Item
                nodeId={nodeId}
                node={node}
                labelText={labelText}
                onAction={onAction}
                onDrop={onDrop}/>
            }
            expandIcon={isRoot && <div/>}
            collapseIcon={isRoot && <div/>}
        />
    )
};
