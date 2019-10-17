import React from "react";
import {Route, Redirect, RouteProps} from "react-router";
import {SecureKeyService} from '../logic/SecureKeyService';
import {RoutePaths} from './index';

function hasAccountSet(): boolean {
    let service = new SecureKeyService();
    console.log('hasAccountSet', service.hasKeysStored());
    return service.hasKeysStored()
}

export const PrivateRoute = (props: RouteProps) =>
    <React.Fragment>
        { hasAccountSet() ? props.children : <Redirect to={RoutePaths.Login} /> }
    </React.Fragment>;

