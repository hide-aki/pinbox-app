import React from 'react';
import {Page} from '../../components/Page';
import {makeStyles, Theme} from '@material-ui/core';
import PoolsBackgroundImage from '../../images/background3.png';

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        width: "80%"
    }
}));

export const SubscriptionsPage: React.FC = () => {
    const classes = useStyle();
    return (
        <Page backgroundImage={PoolsBackgroundImage}>
            <div className={classes.root}>
                <h1>Subscription Page</h1>
            </div>
        </Page>
    );
};

