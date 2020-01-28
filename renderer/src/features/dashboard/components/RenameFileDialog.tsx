import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {OnDialogCloseFn} from './FileTree/typings/onDialogCloseFn';
import {getLabelFromNodeId} from './FileTree/helper/getLabelFromNodeId';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {isEmptyString} from '../../../utils/isEmptyString';

interface RenameFileDialogProps {
    isOpen: boolean
    nodeId: any
    onClose: OnDialogCloseFn
}

function validateName(newName: string): boolean {
    if (!isEmptyString(newName)) {
        return newName.indexOf('/') === -1
    }
    return false;
}

const InitialName='@@INIT_NAME';

export const RenameFileDialog: React.FC<RenameFileDialogProps> = ({nodeId, isOpen, onClose}) => {
    const intl = useIntl();
    const [open, setOpen] = useState(isOpen);
    const [valid, setValid] = useState(true);
    const [name, setName] = useState(InitialName);

    useEffect(() => {
        setOpen(isOpen);
        setName(getLabelFromNodeId(nodeId));
        return () => { resetDialog() }
    }, [isOpen, nodeId]);

    const resetDialog = () => {
        setValid(true);
        setName(InitialName);
    };

    const handleClose = () => {
        setOpen(false);
        onClose(null)
    };

    const handleConfirm = () => {
        setOpen(false);
        onClose(name)
    };

    const handleNameChange = (e: ChangeEvent) => {
        // @ts-ignore
        const newName = e.target.value;
        setName(newName);
        setValid(validateName(newName))
    };

    const label = getLabelFromNodeId(nodeId);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id="dashboard.dialog.rename_file.title"/>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <FormattedHTMLMessage
                        id="dashboard.dialog.rename_file.description"
                        values={{label}}
                    />
                </DialogContentText>
                <TextField
                    autoFocus
                    error={!valid}
                    helperText={!valid && intl.formatMessage({id: 'dashboard.dialog.rename_file.invalid_name'})}
                    margin="dense"
                    id="name"
                    label={intl.formatMessage({id: 'dashboard.dialog.rename_file.label'})}
                    type="text"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    <FormattedMessage id="button.cancel"/>
                </Button>
                <Button onClick={handleConfirm} color="primary" disabled={!valid}>
                    <FormattedMessage id="button.apply"/>
                </Button>
            </DialogActions>
        </Dialog>
    );
};
