import {makeStyles, Portal, Snackbar, Theme} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {messageSelector} from '../selectors';
import {MessageType} from '../../typings/NotificationMessage';
import {translate} from '../../utils/translate';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            top: '80px',
        },
    })
);

type SeverityType = 'success' | 'info' | 'error' | 'warning'

export const Notification: React.FC = () => {
    const classes = useStyles();
    const intl = useIntl();
    const message = useSelector(messageSelector);
    const [showSnackbar, setShowSnackbar] = useState(false);
    useEffect(() => {
        setShowSnackbar(message.type !== MessageType.None);
    }, [message]);

    const severity = message.type.toString() as SeverityType;
    const notificationText = message.type === MessageType.Error ? translate(intl)(message.text) : message.text

    function handleCloseSnackbar() {
        setShowSnackbar(false);
    }

    return (
        <Portal>
            <Snackbar className={classes.root}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      open={showSnackbar}
                      onClose={handleCloseSnackbar}
                      autoHideDuration={5 * 1000}
            >
                <Alert
                    variant='filled'
                    elevation={3}
                    onClose={handleCloseSnackbar}
                    severity={severity}
                >
                    {notificationText}
                </Alert>
            </Snackbar>
        </Portal>
    )
};
