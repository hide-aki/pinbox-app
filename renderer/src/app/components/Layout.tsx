import React from 'react';
import {PinboxAppBar} from './PinboxAppBar';
import {useSelector} from 'react-redux';
import {selectHasEnteredPin} from '../selectors';
import {EnterPinDialog} from './EnterPinDialog';

export const Layout: React.FC = () => {
    const hasEnteredPin = useSelector(selectHasEnteredPin);
    return (
        <React.Fragment>
            <PinboxAppBar/>
            <EnterPinDialog isOpen={!hasEnteredPin}/>
        </React.Fragment>
)
};

