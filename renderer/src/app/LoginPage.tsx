import React from 'react';
import {useHistory} from 'react-router';
import {FormattedMessage} from 'react-intl';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography
} from '@material-ui/core';

import {Page} from '../components/Page';
import LoginImage from '../images/login.png'
import {RoutePaths} from '../routing/routes';
import LoginBackgroundImage from '../images/background2.png';


const useStyles = makeStyles({
    card: {
        maxWidth: 600,
        height: 'fit-content'
    },
    media: {
        height: 360,
        backgroundPosition: 'right',
    },
    actions: {
        justifyContent: 'space-between'
    }
});

export const LoginPage: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();

    function gotoCreateAccount() {
        history.push(RoutePaths.AccountNew)
    }

    function gotoSetAccount() {
        history.push(RoutePaths.AccountSet)
    }

    return (
        <Page backgroundImage={LoginBackgroundImage}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={LoginImage}
                    title="Login Logo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <FormattedMessage id="login.title"/>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <FormattedMessage id="login.description"/>
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button color="primary" onClick={gotoSetAccount}>
                        <FormattedMessage id="button.set_account"/>
                    </Button>
                    <Button color="primary" onClick={gotoCreateAccount}>
                        <FormattedMessage id="button.create_account"/>
                    </Button>
                </CardActions>
            </Card>
        </Page>
    )
};

