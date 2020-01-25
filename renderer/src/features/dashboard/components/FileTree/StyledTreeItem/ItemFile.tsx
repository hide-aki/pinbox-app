import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Typography} from '@material-ui/core';
import InsertDriveFileTwoTone from '@material-ui/icons/InsertDriveFileTwoTone';

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

interface StyledTreeItemProps {
    nodeId: string;
    labelText: string;
    actions?: JSX.Element;
}

export const ItemFile: React.FC<StyledTreeItemProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const {nodeId, labelText, actions: Actions = null, ...other} = props;

    return (
        <div className={classes.labelRoot}>
            <InsertDriveFileTwoTone className={classes.fileIcon}/>
            <Typography variant="body2" className={classes.labelText}>
                {labelText}
            </Typography>
            {Actions}
        </div>
    )
};
