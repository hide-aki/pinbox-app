import React from 'react';
import {IconButton, Menu, MenuItem} from '@material-ui/core';
import MoreVertTwoTone from '@material-ui/icons/MoreVertTwoTone'
import {FileTreeAction} from '../typings/fileTreeAction';
import {FormattedMessage} from 'react-intl';

interface StyledTreeItemActionsProps {
    actions: FileTreeAction[];
    onAction: (action: FileTreeAction) => void
}

export const ItemActions: React.FC<StyledTreeItemActionsProps> = (props): JSX.Element | null => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {actions, onAction} = props;

    if (!actions.length) return null;

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
                            <FormattedMessage id={action.labelId}/>
                        </MenuItem>)
                }
            </Menu>
        </React.Fragment>
    )
};
