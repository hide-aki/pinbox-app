import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import FileDrop from 'react-file-drop';
import DropzoneImage from '../../../../images/dropzone.png';
import {FormattedMessage} from 'react-intl';
import {ElectronContext} from '../../../../components/contexts/ElectronContext';
import {OnDropFn} from './typings/onDropFn';
import {getFileEntry} from './helper/getFileEntry';
import {extendFileListInformation} from './helper/extendFileListInformation';

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "600px",
        background: "white",
        borderRadius: 4,
    },
    draggedOver : {
        transform: 'scale(1.025) !important',
        filter: "saturate(1.5) !important",
        transition: "filter 0.5s, transform 0.5s",
    },
    image: {
        width: '100%',
        height: 'auto',
        transform: 'scale(1.0)',
        filter: "saturate(0.8)",
        transition: "filter 0.75s, transform 0.75s",
    },
    text : {
        textAlign: "center",
        color: "darkgray"
    }
});

interface DropBoxProps{
    onDrop: OnDropFn
}

export const DropZone: React.FunctionComponent<DropBoxProps> = ({onDrop}) => {
    const classes = useStyles();

    const electronService = useContext(ElectronContext);
    electronService.onMessage( console.log );

    const [draggedOver, setDraggedOver] = useState(false);

    const handleDragOver = () => {
        setDraggedOver(true)
    };

    const handleDragLeave = () => {
        setDraggedOver(false)
    };

    const handleDrop = (files: FileList| null, e:React.DragEvent) => {
        handleDragLeave();
        const extendedFiles = extendFileListInformation(files, e);
        onDrop(extendedFiles, '');
    };

    return (
        <FileDrop className={classes.root}
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
