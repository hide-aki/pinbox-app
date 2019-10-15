import React from 'react';
import {createStyles, makeStyles, Paper, Theme} from '@material-ui/core';
import {Page} from '../components/Page';
import {FormattedMessage} from 'react-intl';
import {AccountSetter} from '../components/accountWizard/set';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(3, 3),
            maxWidth: '800px',
        },
    }),
);

export const SetAccount: React.FC = () => {
    const classes = useStyles();
    return (
        <Page>
            <Paper className={classes.paper}>
                <h1><FormattedMessage id="account.set.account"/></h1>
                <p><FormattedMessage id="account.set.description"/></p>
                <AccountSetter/>
            </Paper>
        </Page>
    )
};
