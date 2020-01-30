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
import {useSelector} from 'react-redux';
import {selectHasEnteredPin} from '../app/selectors';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    normal: {
        filter: 'sepia(0) blur(0)',
        transition: 'filter 1s',
    },
    blurred: {
        filter: 'sepia(1) blur(10px)',
        transition: 'filter 5s'
    },
});
export const AppRouter: React.FC = () => {
    const classes = useStyles();
    const hasEnteredPin = useSelector(selectHasEnteredPin);
    return (
        <Router>
            <div className={hasEnteredPin ? classes.normal : classes.blurred }>
                <Layout/>
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
                    </RequiresAccount>
                </Switch>
            </div>
        </Router>
    );
};
