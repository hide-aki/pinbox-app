import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {applicationSlice} from '../slice';
import {SecureKeyService} from '../../services/SecureKeyService';

interface EnterPinDialogProps {
    isOpen: boolean
}

function validatePin(pin: string): boolean {
    const secureKeyService = new SecureKeyService();
    try {
        return secureKeyService.getKeys(pin).publicKey !== undefined
    } catch (e) {
        // ignore
    }
    return false;
}

export const EnterPinDialog: React.FC<EnterPinDialogProps> = ({isOpen}) => {
    const intl = useIntl();
    const [open, setOpen] = useState(isOpen);
    const dispatch = useDispatch();
    const [valid, setValid] = useState(true);
    const [pin, setPin] = useState('');

    useEffect(() => {
        setOpen(isOpen);
        return () => {
            resetDialog()
        }
    }, [isOpen]);

    const resetDialog = () => {
        setValid(true);
        setPin('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        const isValidPin = validatePin(pin);
        setValid(isValidPin);
        setOpen(!isValidPin);
        dispatch(applicationSlice.actions.setHasEnteredPin(isValidPin))
    };

    const handleChange = (e: ChangeEvent) => {
        // @ts-ignore
        setPin(e.target.value);
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id="app.dialog.enter_pin.title"/>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <FormattedHTMLMessage
                        id="app.dialog.enter_pin.description"
                    />
                </DialogContentText>
                <TextField
                    autoFocus
                    error={!valid}
                    helperText={!valid && intl.formatMessage({id: 'app.dialog.enter_pin.invalid_pin'})}
                    margin="dense"
                    id="name"
                    label={intl.formatMessage({id: 'app.dialog.enter_pin.label'})}
                    type="text"
                    fullWidth
                    value={pin}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} color="primary">
                    <FormattedMessage id="button.apply"/>
                </Button>
            </DialogActions>
        </Dialog>
    );
};
