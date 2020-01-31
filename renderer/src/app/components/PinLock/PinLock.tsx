import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LockTwoTone from '@material-ui/icons/LockTwoTone';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {applicationSlice} from '../../slice';
import {SecureKeyService} from '../../../services/SecureKeyService';
import {ForgotPinPanel} from './ForgotPinPanel';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
        aligned: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
    })
)

function validatePin(pin: string): boolean {
    const secureKeyService = new SecureKeyService();
    try {
        return secureKeyService.getKeys(pin).publicKey !== undefined
    } catch (e) {
        // ignore
    }
    return false;
}

interface PinLockProps {
    open: boolean
}

export const PinLock: React.FC<PinLockProps> = (props) => {
    const intl = useIntl();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [valid, setValid] = useState(true);
    const [pin, setPin] = useState('');

    const handleConfirm = () => {
        const isValidPin = validatePin(pin);
        setValid(isValidPin);
        setPin('');
        dispatch(applicationSlice.actions.setHasEnteredPin(isValidPin))
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleConfirm();
        }
    };

    const handleChange = (e: React.ChangeEvent) => {
        // @ts-ignore
        setPin(e.target.value);
    };

    const handleReset = () => {
        dispatch(applicationSlice.actions.reset());
    };

    return (
        <div onKeyPress={handleKeyPress}>
            <Dialog
                open={props.open}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="form-dialog-title">
                    <div className={classes.aligned}>
                        <FormattedMessage id="app.dialog.enter_pin.title"/>
                        <LockTwoTone fontSize={'large'}/>
                    </div>
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
                        id="pin"
                        label={intl.formatMessage({id: 'app.dialog.enter_pin.label'})}
                        type="password"
                        fullWidth
                        value={pin}
                        onChange={handleChange}
                    />
                    <ForgotPinPanel onConfirm={handleReset}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm} color="primary">
                        <FormattedMessage id="button.apply"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
