import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core';
import FileDrop from 'react-file-drop';
import DropzoneImage from '../../images/dropzone.png';
import {FormattedMessage} from 'react-intl';

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        maxHeight: "600px",
        background: "#f5f5f5",
        borderRadius: 4,
    },
    draggedOver : {
        transform: 'scale(1.025) !important',
        filter: "saturate(1.5) !important",
        transition: "filter 0.5s, transform 0.5s",
    },
    image: {
        maxHeight: 400,
        transform: 'scale(1.0)',
        filter: "saturate(0.8)",
        transition: "filter 0.75s, transform 0.75s",
    },
    text : {
        textAlign: "center",
        color: "darkgray"
    }
});

type OnDropFn = ((files: FileList| null, event: React.DragEvent<HTMLDivElement>) => any) | undefined
interface DropBoxProps{
    onDrop: OnDropFn
}

export const DropBox: React.FunctionComponent<DropBoxProps> = ({onDrop}) => {
    const classes = useStyles();

    const [draggedOver, setDraggedOver] = useState(false)

    const handleDragOver = () => {
        setDraggedOver(true)
    };

    const handleDragLeave = () => {
        setDraggedOver(false)
    };

    const handleDrop = (files: FileList| null, event: React.DragEvent<HTMLDivElement>) => {
        handleDragLeave();
        if(onDrop){
            onDrop(files, event);
        }
    };

    return (
        <FileDrop className={`${classes.root}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
        >
            <img className={`${classes.image} ${draggedOver && classes.draggedOver}`} src={DropzoneImage} alt="Drop Zone" />
            <p className={classes.text}>
                <FormattedMessage id="dropbox.drop_here" />
            </p>
        </FileDrop>
    );
};
