import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {IconButton, Menu, MenuItem} from '@material-ui/core';
import MoreVertTwoTone from '@material-ui/icons/MoreVertTwoTone'
import {FileTreeAction} from '../typings/fileTreeAction';

const useActionStyles = makeStyles(theme => ({
    root: {},
}));

interface StyledTreeItemActionsProps {
    actions: FileTreeAction[];
    onAction: (action: FileTreeAction) => void
}

export const ItemActions: React.FC<StyledTreeItemActionsProps> = (props): JSX.Element | null => {
    const classes = useActionStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {actions, onAction} = props;

    if(!actions.length) return null;

    const closeActions = (event: any) => {
        setAnchorEl(null);
        event.stopPropagation()
    };

    const openActions = (event: any) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation()
    };

    const handleAction = (action: FileTreeAction) => (event: any) => {
        onAction(action);
        closeActions(event)
    };

    return (
        <React.Fragment>
            <IconButton size="small" aria-controls="action-menu" onClick={openActions}>
                <MoreVertTwoTone/>
            </IconButton>
            <Menu
                id="action-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeActions}
            >
                {
                    actions.map(action =>
                        <MenuItem key={action.name}
                                  onClick={handleAction(action)}>
                            {action.label}
                        </MenuItem>)
                }
            </Menu>
        </React.Fragment>
    )
};
