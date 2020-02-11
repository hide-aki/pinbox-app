import React, {useContext, useEffect, useState} from 'react';
import {PinboxAppBar} from './PinboxAppBar';
import {PinLock} from './PinLock';
import {makeStyles, Portal, Snackbar, Theme} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {messageSelector, selectHasEnteredPin} from '../selectors';
import {RoutePaths} from '../../routing/routes';
import {useLocation} from 'react-router-dom';
import {ElectronContext} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import {MessageType} from '../../typings/NotificationMessage';
import {useIntl} from 'react-intl';
import {translate} from '../../utils/translate';
import {Alert} from '@material-ui/lab';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
        root: {},
        normal: {
            filter: 'sepia(0) blur(0)',
            transition: 'filter 0.5s ease-in',
        },
        blurred: {
            filter: 'sepia(1) blur(10px)',
            transition: 'filter 2s ease-out'
        },
        content: {
            position: 'relative',
        },
        snackbar: {
            // position: 'sticky',
            // transform: 'none',
            top: '80px',
        }
    })
);

const UnlockedRoutes = new Set<string>([
    RoutePaths.AccountSet,
    RoutePaths.AccountNew,
    RoutePaths.Account,
    RoutePaths.Login,
    RoutePaths.Settings,
]);


function showPinLock(hasEnteredPin: boolean, location: string): boolean {
    if (UnlockedRoutes.has(location)) return false;
    return !hasEnteredPin;
}

type SeverityType = 'success' | 'info' | 'error' | 'warning'

export const Layout: React.FC = ({children}) => {
    const electronService = useContext<ElectronService>(ElectronContext);
    const classes = useStyles();
    const intl = useIntl();
    const location = useLocation();
    const hasEnteredPin = useSelector(selectHasEnteredPin);
    const message = useSelector(messageSelector);
    const [showSnackbar, setShowSnackbar] = useState(false);
    useEffect(() => {
        setShowSnackbar(message.type !== MessageType.None);
    }, [message]);

    const severity = message.type.toString() as SeverityType;
    console.log(message.type, message.text);
    const notificationText = message.type === MessageType.Error ? translate(intl)(message.text) : message.text

    function handleCloseSnackbar() {
        setShowSnackbar(false);
    }

    const isPinLockShown = electronService.isDevelopment ? false : showPinLock(hasEnteredPin, location.pathname);

    return (
        <div className={clsx(isPinLockShown ? classes.blurred : classes.normal, classes.root)}>
            <PinboxAppBar/>
            <PinLock open={isPinLockShown}/>
            <Portal>
                <Snackbar className={classes.snackbar}
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
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};


