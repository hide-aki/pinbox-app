import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Layout} from '../Layout';
import {RoutePaths} from './index';
import {Index} from '../pages/Index';
import {Account} from '../pages/Account';
import {NewAccount} from '../pages/NewAccount';
import {SetAccount} from '../pages/SetAccount';
import {PrivateRoute} from './PrivateRoute';
import {Login} from '../pages/Login';

export const AppRouter: React.FC = () => (
    <Router>
        <div>
            <Layout/>
            <Switch>
                <Route path={RoutePaths.Login} exact component={Login}/>
                <Route path={RoutePaths.AccountNew} exact component={NewAccount}/>
                <Route path={RoutePaths.AccountSet} exact component={SetAccount}/>
                <PrivateRoute>
                    <Route path={RoutePaths.Index} exact component={Index}/>
                    <Route path={RoutePaths.Account} exact component={Account}/>
                </PrivateRoute>
            </Switch>
        </div>
    </Router>
);
