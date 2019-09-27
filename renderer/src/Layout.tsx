import React from 'react';
import {Link} from 'react-router-dom';
import {RouteProviders} from './routes';
import {PinboxAppBar} from './components/PinboxAppBar';

/*
    <div>
        <nav>
            <ul>
                <li>
                    <Link to={RouteProviders.Index()}>Home</Link>
                </li>
                <li>
                    <Link to={RouteProviders.Account()}>Account</Link>
                </li>
                <li>
                    <Link to={RouteProviders.NewAccount()}>New Account</Link>
                </li>
            </ul>
        </nav>
    </div>

 */


export const Layout: React.FC = () => (
    <PinboxAppBar />
);

