import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface RenameFileDialogProps {
    isOpen: boolean
    nodeId: any
}

export const RenameFileDialog : React.FC<RenameFileDialogProps> = ({nodeId, isOpen}) => {
    const [open, setOpen] = useState(isOpen);
    const [name, setName] = useState('');

    useEffect(() => {
        setOpen(isOpen);
        setName(nodeId);
    }, [isOpen, nodeId]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        console.log('new name', name);
        setOpen(false)
    };

    const handleNameChange = (e: ChangeEvent) => {
        console.log('new name', e.target.nodeValue);
        const newName = e.target.nodeValue || '';
        setName(newName)
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Rename File</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`Bla ${nodeId}`}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Rename
                </Button>
            </DialogActions>
        </Dialog>
    );
};
