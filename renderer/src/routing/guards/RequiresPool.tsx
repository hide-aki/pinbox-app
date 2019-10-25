import React from "react";
import {Redirect, RouteProps} from "react-router";
import {RoutePaths} from '../routes';
import {PersistenceService} from '../../services/PersistenceService';

function hasPoolSet(): boolean {
    let service = new PersistenceService();
    return !!service.getItem('pool')
}

export const RequiresPool = (props: RouteProps) =>
    <React.Fragment>
        { hasPoolSet() ? props.children : <Redirect to={RoutePaths.Pools} /> }
    </React.Fragment>;

