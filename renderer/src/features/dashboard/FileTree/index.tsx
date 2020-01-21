import React from 'react';
import {makeStyles} from '@material-ui/core';
import {fileTreeWalker} from './helper/fileTreeWalker';

const useStyles = makeStyles({
    root: {
        border: "1px solid black"
    },
});

interface FileTreeProps{
    tree: object
}

export const FileTree = (props: FileTreeProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            File Tree View
        </div>
    )
};
