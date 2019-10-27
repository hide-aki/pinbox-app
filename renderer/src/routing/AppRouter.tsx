import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {RoutePaths} from './routes';
import {RequiresPool} from './guards/RequiresPool';
import {Layout} from '../app/components/Layout';
import {DropboxPage} from '../features/dropbox/DropboxPage';
import {NewAccountPage} from '../features/account/NewAccountPage';
import {SetAccountPage} from '../features/account/SetAccountPage';
import {RequiresAccount} from './guards/RequiresAccount';
import {LoginPage} from '../app/LoginPage';
import {PoolsPage} from '../features/pools/PoolsPage';
import {AccountPage} from '../features/account/AccountPage';

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <div>
                <Layout/>
                <Switch>
                    <Route path={RoutePaths.Login} exact component={LoginPage}/>
                    <Route path={RoutePaths.Pools} exact component={PoolsPage}/>
                    <Route path={RoutePaths.AccountNew} exact component={NewAccountPage}/>
                    <Route path={RoutePaths.AccountSet} exact component={SetAccountPage}/>
                    <RequiresAccount>
                        <Route path={RoutePaths.Account} exact component={AccountPage}/>
                        <RequiresPool>
                            <Route path={RoutePaths.Index} exact component={DropboxPage}/>
                        </RequiresPool>
                    </RequiresAccount>
                </Switch>
            </div>
        </Router>
    );
}
