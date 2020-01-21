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
    content: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    fileIcon: {
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
    labelInfo?: string;
    actions?: JSX.Element;
    color?: string;
    bgColor?: string;
}

export const ItemFile: React.FC<StyledTreeItemProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const {nodeId, labelText, labelInfo, color, bgColor, actions: Actions = null, ...other} = props;

    return (
        <div className={classes.labelRoot}>
            <InsertDriveFileTwoTone className={classes.fileIcon} color="primary"/>
            <Typography variant="body2" className={classes.labelText}>
                {labelText}
            </Typography>
            {Actions}
        </div>
    )
};
