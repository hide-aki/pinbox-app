import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Layout} from '../Layout';
import {RoutePaths} from './index';
import {Index} from '../pages/Index';
import {Account} from '../pages/Account';
import {NewAccount} from '../pages/NewAccount';
import {SetAccount} from '../pages/SetAccount';
import {RequiresAccount} from './RequiresAccount';
import {Login} from '../pages/Login';
import {RequiresNode} from './RequiresNode';
import {Nodes} from '../pages/Nodes';

export const AppRouter: React.FC = () => (
    <Router>
        <div>
            <Layout/>
            <Switch>
                <Route path={RoutePaths.Login} exact component={Login}/>
                <Route path={RoutePaths.Nodes} exact component={Nodes}/>
                <Route path={RoutePaths.AccountNew} exact component={NewAccount}/>
                <Route path={RoutePaths.AccountSet} exact component={SetAccount}/>
                <RequiresAccount>
                    <RequiresNode>
                        <Route path={RoutePaths.Index} exact component={Index}/>
                    </RequiresNode>
                    <Route path={RoutePaths.Account} exact component={Account}/>
                </RequiresAccount>
            </Switch>
        </div>
    </Router>
);
