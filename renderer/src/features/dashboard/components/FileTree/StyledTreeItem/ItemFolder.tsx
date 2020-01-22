import React, {useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Fade, Typography} from '@material-ui/core';
import FolderTwoTone from '@material-ui/icons/FolderTwoTone';
import NoteAddTwoTone from '@material-ui/icons/NoteAddTwoTone';
import FileDrop from 'react-file-drop';
import {OnDropFn} from '../typings/onDropFn';
import {extendFileListInformation} from '../helper/extendFileListInformation';

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
    folderIcon: {
        marginRight: theme.spacing(1),
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

interface StyledTreeItemProps {
    nodeId: string;
    labelText: string;
    onDrop: OnDropFn;
    actions?: JSX.Element;
}

export const ItemFolder: React.FC<StyledTreeItemProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const [draggedOver, setDraggedOver] = useState(false);
    const {nodeId, labelText, onDrop, actions: Actions = null, ...other} = props;

    const handleDragOver = () => {
        setDraggedOver(true)
    };

    const handleDragLeave = () => {
        setDraggedOver(false)
    };

    const handleDrop = (files: FileList | null, e: React.DragEvent) => {
        handleDragLeave();
        const extendedFiles = extendFileListInformation(files, e);
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
                    ? <Fade in={draggedOver} style={{ transitionDelay: draggedOver ? '0.1s' : '0ms' }}>
                        <NoteAddTwoTone className={classes.dropIcon}/>
                    </Fade>
                    : <FolderTwoTone className={classes.folderIcon} color="primary"/>
            }
            <Typography variant="body2" className={classes.labelText}>
                {labelText}
            </Typography>
            {Actions}
        </FileDrop>
    )
};
