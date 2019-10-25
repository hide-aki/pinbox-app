import React from 'react';
import {createStyles, makeStyles, Paper, Theme} from '@material-ui/core';
import {Page} from '../../components/Page';
import {FormattedMessage} from 'react-intl';
import {AccountSetter} from './wizard/set';

import AccountBackgroundImage from '../../images/background2.png';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(3, 3),
            maxWidth: '800px',
            height: 'fit-content',
        },
    }),
);

export const SetAccountPage: React.FC = () => {
    const classes = useStyles();
    return (
        <Page backgroundImage={AccountBackgroundImage}>
            <Paper className={classes.paper}>
                <h1><FormattedMessage id="account.set.account"/></h1>
                <p><FormattedMessage id="account.set.description"/></p>
                <AccountSetter/>
            </Paper>
        </Page>
    )
};

