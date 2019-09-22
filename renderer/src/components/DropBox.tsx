import React from 'react';
import {makeStyles} from '@material-ui/core';
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

type OnDropFn = ((files: FileList| null, event: React.DragEvent<HTMLDivElement>) => any) | undefined
interface DropBoxProps{
    onDrop: OnDropFn
}

export const DropBox: React.FunctionComponent<DropBoxProps> = ({onDrop}) => {
    const classes = useStyles();
    return (
        <FileDrop className={classes.root}
                  onDrop={onDrop}
        >
            <MoveToInboxTwoTone className={classes.icon}/>
        </FileDrop>
    );
};
