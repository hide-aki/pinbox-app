import React from 'react';
import {Link} from 'react-router-dom';
import {RouteProviders} from './routes';

export const Layout: React.FC = () => (
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
);

