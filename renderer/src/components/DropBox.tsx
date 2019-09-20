import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import MoveToInboxTwoTone from '@material-ui/icons/MoveToInboxTwoTone';
import FileDrop from 'react-file-drop';

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        maxHeight: "600px",
        background: "lightblue",
    },
    icon: {
        fontSize: '8rem',
    }
});

export const DropBox: React.FC = () => {
    const classes = useStyles();
    return (
        <FileDrop className={classes.root}
            onDrop={ (files,event) => {

                // @ts-ignore
                console.log(event.dataTransfer.items[0].webkitGetAsEntry())
            } }
        >
            <MoveToInboxTwoTone className={classes.icon}/>
        </FileDrop>
    );
};
