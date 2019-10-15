import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Layout} from '../Layout';
import {RoutePaths} from './index';
import {Index} from '../pages/Index';
import {Account} from '../pages/Account';
import {NewAccount} from '../pages/NewAccount';
import {SetAccount} from '../pages/SetAccount';

export const AppRouter: React.FC = () => (
    <Router>
        <div>
            <Layout/>
            <Route path={RoutePaths.Index} exact component={Index}/>
            <Route path={RoutePaths.AccountNew} exact component={NewAccount}/>
            <Route path={RoutePaths.AccountSet} exact component={SetAccount}/>
            <Route path={RoutePaths.Account} exact component={Account}/>
        </div>
    </Router>
);
