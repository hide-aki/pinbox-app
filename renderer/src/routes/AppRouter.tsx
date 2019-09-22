import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Layout} from '../Layout';
import {RoutePaths} from './index';
import {Index} from '../pages/Index';
import {Account} from '../pages/Account';
import {NewAccount} from '../pages/NewAccount';

export const AppRouter: React.FC = () => (
    <Router>
        <div>
            <Layout/>
            <Route path={RoutePaths.Index} exact component={Index}/>
            <Route path={RoutePaths.NewAccount} component={NewAccount}/>
            <Route path={RoutePaths.Account} component={Account}/>
        </div>
    </Router>
);
