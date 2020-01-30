import React from "react";
import {Redirect, RouteProps} from "react-router";
import {RoutePaths} from '../routes';
import {PoolService} from '../../services/PoolService';
import {selectCurrentPool} from '../../features/pools/selectors';

function hasPoolSet(): boolean {
    // const service = new PoolService();
    // return service.getCurrentPool().length > 0
    return true;
}

export const RequiresPool = (props: RouteProps) =>
    <React.Fragment>
        { hasPoolSet() ? props.children : <Redirect to={RoutePaths.Pools} /> }
    </React.Fragment>;

