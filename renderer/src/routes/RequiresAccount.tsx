import React from "react";
import {Redirect, RouteProps} from "react-router";
import {SecureKeyService} from '../logic/SecureKeyService';
import {RoutePaths} from './index';

function hasAccountSet(): boolean {
    let service = new SecureKeyService();
    return service.hasKeysStored()
}

export const RequiresAccount = (props: RouteProps) =>
    <React.Fragment>
        { hasAccountSet() ? props.children : <Redirect to={RoutePaths.Login} /> }
    </React.Fragment>;

