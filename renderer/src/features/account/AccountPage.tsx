import React from 'react';
import {createStyles, makeStyles, Paper, Theme} from '@material-ui/core';
import {Page} from '../../app/components/Page';

import AccountBackgroundImage from '../../images/background2.png';
import {AccountDetails} from './components/details/AccountDetails';
import {useSelector} from 'react-redux';
import {currentAccountSelector} from './selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(3, 3),
            maxWidth: '800px',
            height: 'fit-content',
            width: '100%',
            opacity: 0.9,
        },
    }),
);

export const AccountPage: React.FC = () => {
    const classes = useStyles();
    const account = useSelector(currentAccountSelector);
    return (
        <Page backgroundImage={AccountBackgroundImage}>
            <Paper className={classes.paper}>
                <AccountDetails account={account}/>
            </Paper>
        </Page>
    )
};

