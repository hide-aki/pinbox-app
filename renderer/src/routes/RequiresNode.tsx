import React from "react";
import {Redirect, RouteProps} from "react-router";
import {RoutePaths} from './index';
import {PersistenceService} from '../logic/PersistenceService';

function hasNodeSet(): boolean {
    let service = new PersistenceService();
    return !!service.getItem('selectedNode')
}

export const RequiresNode = (props: RouteProps) =>
    <React.Fragment>
        { hasNodeSet() ? props.children : <Redirect to={RoutePaths.Nodes} /> }
    </React.Fragment>;

