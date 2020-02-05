import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {RoutePaths} from './routes';
import {Layout} from '../app/components/Layout';
import {DashboardPage} from '../features/dashboard/DashboardPage';
import {NewAccountPage} from '../features/account/NewAccountPage';
import {SetAccountPage} from '../features/account/SetAccountPage';
import {RequiresAccount} from './guards/RequiresAccount';
import {LoginPage} from '../app/LoginPage';
import {AccountPage} from '../features/account/AccountPage';
import {SettingsPage} from '../features/settings/SettingsPage';
import {SubscriptionsPage} from '../features/subscriptions/SubscriptionsPage';

export const AppRouter: React.FC = () =>
    <Router>
        <Layout>
            <Switch>
                <Route path={RoutePaths.Login} exact component={LoginPage}/>
                <Route path={RoutePaths.AccountNew} exact component={NewAccountPage}/>
                <Route path={RoutePaths.AccountSet} exact component={SetAccountPage}/>
                <Route path={RoutePaths.Settings} exact component={SettingsPage}/>
                <RequiresAccount>
                    <Route path={RoutePaths.Account} component={AccountPage}/>
                    {/*<Route path={RoutePaths.Pools} component={PoolsPage}/>*/}
                    <Route path={RoutePaths.Index} exact component={DashboardPage}/>
                    <Route path={RoutePaths.Dashboard} exact component={DashboardPage}/>
                    <Route path={RoutePaths.Subscriptions} exact component={SubscriptionsPage}/>
                </RequiresAccount>
            </Switch>
        </Layout>
    </Router>;
