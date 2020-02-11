import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SecurityTwoToneIcon from '@material-ui/icons/SecurityTwoTone';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {applicationSlice} from '../../slice';
import {SecureKeyService} from '../../../services/SecureKeyService';
import {makeStyles} from '@material-ui/core/styles';
import {RoutePaths} from '../../../routing/routes';
import {useHistory} from 'react-router-dom';
import {OnEventFn} from '../../../typings/OnEventFn';
import {ForgotPinPanel} from '../ForgotPinPanel';

const useStyles = makeStyles(theme => ({
        aligned: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
    })
);

function validatePin(pin: string): boolean {
    const secureKeyService = new SecureKeyService();
    try {
        return secureKeyService.getKeys(pin).publicKey !== undefined
    } catch (e) {
        // ignore
    }
    return false;
}

interface AskForPinDialogProps {
    open: boolean,
    onClose: OnEventFn<string|null>
}

export const AskForPinDialog: React.FC<AskForPinDialogProps> = (props) => {
    const intl = useIntl();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [valid, setValid] = useState(true);
    const [pin, setPin] = useState('');

    const handleConfirm = () => {
        const isValidPin = validatePin(pin);
        setValid(isValidPin);
        setPin('');
        if(isValidPin){
            props.onClose(pin);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleConfirm();
        }
    };

    const handleCancel = () => {
        setPin('');
        props.onClose(null);
    };

    const handleChange = (e: React.ChangeEvent) => {
        // @ts-ignore
        setPin(e.target.value);
    };

    const handleReset = () => {
        dispatch(applicationSlice.actions.reset());
        history.replace(RoutePaths.Login)
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
                        <SecurityTwoToneIcon fontSize={'large'}/>
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
                    <Button onClick={handleCancel} variant='text'>
                        <FormattedMessage id="button.cancel"/>
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        <FormattedMessage id="button.confirm"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
