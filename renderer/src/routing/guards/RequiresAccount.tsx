import React from "react";
import {Redirect, RouteProps} from "react-router";
import {SecureKeyService} from '../../services/SecureKeyService';
import {RoutePaths} from '../routes';
import {useDispatch, useSelector} from 'react-redux';
import {selectHasEnteredPin} from '../../app/selectors';
import {applicationSlice} from '../../app/slice';
import {useLocation} from "react-router-dom";

function hasAccountSet(): boolean {
    const keyService = new SecureKeyService();
    return keyService.hasKeysStored();
}

export const RequiresAccount = (props: RouteProps) => {
    return (
        <React.Fragment>
            {hasAccountSet() ? props.children : <Redirect to={RoutePaths.Login}/>}
        </React.Fragment>
    )
}

