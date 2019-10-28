import React from "react";
import {Redirect, RouteProps} from "react-router";
import {RoutePaths} from '../routes';
import {PoolService} from '../../services/PoolService';

function hasPoolSet(): boolean {
    const service = new PoolService();
    return service.getCurrentPool().length > 0
}

export const RequiresPool = (props: RouteProps) =>
    <React.Fragment>
        { hasPoolSet() ? props.children : <Redirect to={RoutePaths.Pools} /> }
    </React.Fragment>;

