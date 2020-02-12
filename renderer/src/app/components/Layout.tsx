import React, {useContext} from 'react';
import {PinboxAppBar} from './PinboxAppBar';
import {PinLock} from './PinLock';
import {makeStyles, Theme} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {selectHasEnteredPin} from '../selectors';
import {RoutePaths} from '../../routing/routes';
import {useLocation} from 'react-router-dom';
import {ElectronContext} from '../../components/contexts/ElectronContext';
import {ElectronService} from '../../services/ElectronService';
import clsx from 'clsx';
import {Notification} from './Notification';

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

export const Layout: React.FC = ({children}) => {
    const classes = useStyles();
    const electronService = useContext<ElectronService>(ElectronContext);
    const location = useLocation();
    const hasEnteredPin = useSelector(selectHasEnteredPin);
    const isPinLockShown = electronService.isDevelopment ? false : showPinLock(hasEnteredPin, location.pathname);

    return (
        <div className={clsx(isPinLockShown ? classes.blurred : classes.normal, classes.root)}>
            <PinboxAppBar/>
            <PinLock open={isPinLockShown}/>
            <Notification/>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};


