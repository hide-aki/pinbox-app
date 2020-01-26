import React, {useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Fade, Typography} from '@material-ui/core';
import FolderTwoTone from '@material-ui/icons/FolderTwoTone';
import NoteAddTwoTone from '@material-ui/icons/NoteAddTwoTone';
import FileDrop from 'react-file-drop';
import {OnDropFn} from '../typings/onDropFn';
import {FileTreeAction} from '../typings/fileTreeAction';
import {ActionNames, createActions} from './actions';
import {ItemActions} from './ItemActions';
import {OnActionFn} from '../typings/onActionFn';

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

interface ItemFolderProps {
    nodeId: string;
    node: any;
    labelText: string;
    onDrop: OnDropFn;
    onAction: OnActionFn;
    actions?: JSX.Element;
}

export const ItemFolder: React.FC<ItemFolderProps> = (props): JSX.Element => {
    const classes = useTreeItemStyles();
    const [draggedOver, setDraggedOver] = useState(false);
    const [actionsVisible, setActionsVisible] = useState(false);
    const {node, nodeId, labelText, onDrop, onAction} = props;

    const actions: FileTreeAction[] = createActions(
        nodeId,
        [
            ActionNames.Rename,
            ActionNames.Remove
        ]
    );


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

    function handleMouseEnter() {
        setActionsVisible(true)
    }

    function handleMouseLeave() {
        setActionsVisible(false)
    }


    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                        : <FolderTwoTone className={classes.folderIcon} color="primary"/>
                }
                <Typography variant="body2" className={classes.labelText}>
                    {labelText}
                </Typography>
                {actionsVisible && <ItemActions actions={actions} onAction={onAction}/>}
            </FileDrop>
        </div>
    )
};
