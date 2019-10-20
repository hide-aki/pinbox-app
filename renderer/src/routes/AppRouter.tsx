import React, {useEffect} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Layout} from '../Layout';
import {RoutePaths} from './index';
import {Index} from '../pages/Index';
import {Account} from '../pages/Account';
import {NewAccount} from '../pages/NewAccount';
import {SetAccount} from '../pages/SetAccount';
import {RequiresAccount} from './RequiresAccount';
import {Login} from '../pages/Login';
import {RequiresPool} from './RequiresPool';
import {Pools} from '../pages/Pools';
import {fetchAvailablePools} from '../store/pool/slice';

export const AppRouter: React.FC = () => {

    useEffect( () => {
        fetchAvailablePools()
    }, []);

    return (
        <Router>
            <div>
                <Layout/>
                <Switch>
                    <Route path={RoutePaths.Login} exact component={Login}/>
                    <Route path={RoutePaths.Pools} exact component={Pools}/>
                    <Route path={RoutePaths.AccountNew} exact component={NewAccount}/>
                    <Route path={RoutePaths.AccountSet} exact component={SetAccount}/>
                    <RequiresAccount>
                        <RequiresPool>
                            <Route path={RoutePaths.Index} exact component={Index}/>
                        </RequiresPool>
                        <Route path={RoutePaths.Account} exact component={Account}/>
                    </RequiresAccount>
                </Switch>
            </div>
        </Router>
    );
}
