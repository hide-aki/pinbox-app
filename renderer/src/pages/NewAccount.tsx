import React from 'react';
import {createStyles, makeStyles, Paper, Theme} from '@material-ui/core';
import {Page} from '../components/Page';
import {FormattedMessage} from 'react-intl';
import {AccountCreator} from '../components/accountWizard/create';
import AccountBackgroundImage from '../images/background2.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(3, 3),
            maxWidth: '800px',
            height: 'fit-content',
        },
    }),
);

export const NewAccount: React.FC = () => {
    const classes = useStyles();
    return (
        <Page backgroundImage={AccountBackgroundImage}>
            <Paper className={classes.paper}>
                <h1><FormattedMessage id="account.create.new_account"/></h1>
                <p><FormattedMessage id="account.create.description"/></p>
                <AccountCreator/>
            </Paper>
        </Page>
    )
};

