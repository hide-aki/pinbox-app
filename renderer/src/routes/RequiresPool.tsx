import React from "react";
import {Redirect, RouteProps} from "react-router";
import {RoutePaths} from './index';
import {PersistenceService} from '../logic/PersistenceService';

function hasPoolSet(): boolean {
    let service = new PersistenceService();
    return !!service.getItem('selectedPool')
}

export const RequiresPool = (props: RouteProps) =>
    <React.Fragment>
        { hasPoolSet() ? props.children : <Redirect to={RoutePaths.Pools} /> }
    </React.Fragment>;

