import React, {useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {TreeItem} from '@material-ui/lab';
import {ItemFile} from './ItemFile';
import {ItemFolder} from './ItemFolder';
import {OnDropFn} from '../typings/onDropFn';

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
    labelText: string;
    labelInfo?: string;
    actions: JSX.Element;
    onDrop: OnDropFn;
    isFile: boolean;
    color?: string;
    bgColor?: string;
}

export const StyledTreeItem: React.FC<StyledTreeItemProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const {nodeId, labelText, isFile, labelInfo, color, bgColor, actions, onDrop, ...other} = props;

    const Item = isFile ? ItemFile : ItemFolder;

    return <TreeItem
        className={classes.root}
        nodeId={nodeId}
        label={<Item nodeId={nodeId} labelText={labelText} actions={actions} onDrop={onDrop}/>}
        {...other}
    />;
}
