import React from 'react';
import {PinboxAppBar} from './PinboxAppBar';
import {PinLock} from './PinLock';
import {makeStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {selectHasEnteredPin, selectShowPinLock} from '../selectors';
import {RoutePaths} from '../../routing/routes';
import {useLocation} from 'react-router-dom';
import {applicationSlice} from '../slice';

const useStyles = makeStyles({
    normal: {
        filter: 'sepia(0) blur(0)',
        transition: 'filter 0.5s ease-in',
    },
    blurred: {
        filter: 'sepia(1) blur(10px)',
        transition: 'filter 2s ease-out'
    },
});

const UnlockedRoutes = new Set<string>([
    RoutePaths.AccountSet,
    RoutePaths.AccountNew,
    RoutePaths.Account,
    RoutePaths.Login,
    RoutePaths.Settings,
]);

function showPinLock(hasEnteredPin: boolean, location:string) : boolean {
    if(UnlockedRoutes.has(location)) return false;
    return !hasEnteredPin;
}

export const Layout: React.FC = ({children}) => {
    const classes = useStyles();
    const location = useLocation();
    const hasEnteredPin = useSelector(selectHasEnteredPin);
    const isPinLockShown = showPinLock(hasEnteredPin, location.pathname);

    return (
        <div className={isPinLockShown ? classes.blurred : classes.normal}>
            <PinLock open={isPinLockShown}/>
            <PinboxAppBar/>
            {children}
        </div>
    );
};


