import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {TreeItem} from '@material-ui/lab';
import {Typography} from '@material-ui/core';
import FolderTwoTone from '@material-ui/icons/FolderTwoTone';
import InsertDriveFileTwoTone from '@material-ui/icons/InsertDriveFileTwoTone';
import {Colors} from '../../../theming/colors';

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
    folderIcon: {
        marginRight: theme.spacing(1),
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
    isFile: boolean;
    color?: string;
    bgColor?: string;
}

export const StyledTreeItem: React.FC<StyledTreeItemProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const {nodeId, labelText, isFile, labelInfo, color, bgColor, ...other} = props;
    const localStyle = {
        '--tree-view-color': color || '',
        '--tree-view-bg-color': bgColor || '',
    };
    return <TreeItem
        nodeId={nodeId}
        label={
            <div className={classes.labelRoot}>
                {isFile
                    ? <InsertDriveFileTwoTone className={classes.fileIcon} color="primary"/>
                    : <FolderTwoTone className={classes.folderIcon} color="primary"/>
                }
                <Typography variant="body2" className={classes.labelText}>
                    {labelText}
                </Typography>
                {isFile &&
                <Typography variant="caption" className={classes.labelInfo} color="inherit">
                    {labelInfo}
                </Typography>
                }
            </div>
        }
        classes={{
            root: classes.root,
            content: classes.content,
            expanded: classes.expanded,
            // group: classes.group,
            // label: classes.label,
        }}
        {...other}
    />;
}
