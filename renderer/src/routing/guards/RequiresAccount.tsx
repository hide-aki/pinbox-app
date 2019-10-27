import React from "react";
import {Redirect, RouteProps} from "react-router";
import {SecureKeyService} from '../../services/SecureKeyService';
import {BurstAccountService} from '../../services/BurstAccountService';
import {RoutePaths} from '../routes';

function hasAccountSet(): boolean {
    const keyService = new SecureKeyService();
    const accountService = new BurstAccountService();
    return keyService.hasKeysStored();
}

export const RequiresAccount = (props: RouteProps) =>
    <React.Fragment>
        { hasAccountSet() ? props.children : <Redirect to={RoutePaths.Login} /> }
    </React.Fragment>;

