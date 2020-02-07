import React from 'react';
import {Page} from '../../components/Page';
import {Grid, makeStyles, Theme} from '@material-ui/core';
import PoolsBackgroundImage from '../../images/background4.png';
import {NewSubscriptionWidget} from './widgets/NewSubscriptionWidget';
import {SubscriptionListWidget} from './widgets/SubscriptionListWidget';

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        width: "80%",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
    }
}));

export const SubscriptionsPage: React.FC = () => {
    const classes = useStyle();
    return (
        <Page backgroundImage={PoolsBackgroundImage}>
            <Grid
                className={classes.root}
                container
                direction='column'
                justify='flex-start'
                spacing={2}

            >
                <Grid item xs>
                    <NewSubscriptionWidget/>
                </Grid>
                <Grid item xs>
                    <SubscriptionListWidget/>
                </Grid>
            </Grid>
        </Page>
    );
};

