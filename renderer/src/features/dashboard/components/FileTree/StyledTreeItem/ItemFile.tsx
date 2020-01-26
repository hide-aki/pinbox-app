import React, {useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Typography} from '@material-ui/core';
import InsertDriveFileTwoTone from '@material-ui/icons/InsertDriveFileTwoTone';
import {ItemActions} from './ItemActions';
import {OnActionFn} from '../typings/onActionFn';
import {FileTreeAction} from '../typings/fileTreeAction';
import {ActionNames, createActions} from './actions';

const useTreeItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.secondary,
        '&:focus > $content': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            borderRadius: '2px'
        },
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    fileIcon: {
        color: theme.palette.grey[700],
        marginLeft: theme.spacing(3),
    },
    labelText: {
        flexGrow: 1,
    },
    labelInfo: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(0, 2)
    },
}));

interface ItemFileProps {
    nodeId: string;
    node: any;
    labelText: string;
    onAction: OnActionFn;
}

export const ItemFile: React.FC<ItemFileProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const [actionsVisible, setActionsVisible] = useState(false);
    const {nodeId, labelText, onAction} = props;

    const actions: FileTreeAction[] = createActions(
        nodeId,
        [
            ActionNames.Rename,
            ActionNames.Remove
        ]
    );

    function handleMouseEnter() {
        setActionsVisible(true)
    }

    function handleMouseLeave() {
        setActionsVisible(false)
    }

    return (
        <div className={classes.labelRoot}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            <InsertDriveFileTwoTone className={classes.fileIcon}/>
            <Typography variant="body2" className={classes.labelText}>
                {labelText}
            </Typography>
            {actionsVisible && <ItemActions actions={actions} onAction={onAction}/>}
        </div>
    )
};
