import React, {useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Fade, Typography} from '@material-ui/core';
import AccountTreeTwoTone from '@material-ui/icons/AccountTreeTwoTone';
import NoteAddTwoTone from '@material-ui/icons/NoteAddTwoTone';
import FileDrop from 'react-file-drop';
import {OnDropFn} from '../typings/onDropFn';

// @ts-ignore
const useTreeItemStyles = makeStyles(theme => ({
    fileDrop: {
        borderRadius: '4px',
        backgroundColor: 'inherit',
        color: 'inherit',
        transition: "all 0.3s",
        '& > .file-drop-target': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    defaultIcon: {
        marginRight: theme.spacing(1),
        transform: 'scale(1.25)'
    },
    dropIcon: {
        marginRight: theme.spacing(1),
        color: theme.palette.primary.contrastText,
    },
    labelText: {
        flexGrow: 1,
    },
    draggedOver: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        transition: "all 0.3s",
    }
}));

interface ItemRootProps {
    nodeId: string;
    labelText: string;
    onDrop: OnDropFn;
    actions?: JSX.Element;
}

export const ItemRoot: React.FC<ItemRootProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const [draggedOver, setDraggedOver] = useState(false);
    const {nodeId, labelText, onDrop, actions: Actions = null} = props;

    const handleDragOver = () => {
        setDraggedOver(true)
    };

    const handleDragLeave = () => {
        setDraggedOver(false)
    };

    const handleDrop = (files: FileList | null, e: React.DragEvent) => {
        handleDragLeave();
        onDrop(files, nodeId);
    };

    return (
        <FileDrop className={`${classes.fileDrop} ${draggedOver && classes.draggedOver}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
        >
            {
                draggedOver
                    ? <Fade in={draggedOver} style={{transitionDelay: draggedOver ? '0.1s' : '0ms'}}>
                        <NoteAddTwoTone className={classes.dropIcon}/>
                    </Fade>
                    : <AccountTreeTwoTone className={classes.defaultIcon} color="primary"/>
            }
            <Typography variant="body2" className={classes.labelText}>{labelText}</Typography>
            {Actions}
        </FileDrop>
    )
};
