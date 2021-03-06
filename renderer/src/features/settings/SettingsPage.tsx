import React from 'react';
import {Page} from '../../app/components/Page';
import {createStyles, makeStyles, Paper, Theme} from '@material-ui/core';
import SettingsBackgroundImage from '../../images/background3.png';
import {SettingsForm} from './SettingsForm';
import {FormattedMessage} from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            height: 'fit-content',
            maxWidth: '800px',
            padding: theme.spacing(3, 3),
            width: '100%',
            opacity: 0.9
        },
    }),
);
export const SettingsPage: React.FC = () => {
    const classes = useStyles();
    return (
        <Page backgroundImage={SettingsBackgroundImage}>
            <Paper className={classes.paper}>
                <h1>
                    <FormattedMessage id="settings.title" />
                </h1>
                <SettingsForm />
            </Paper>
        </Page>
    );
};

