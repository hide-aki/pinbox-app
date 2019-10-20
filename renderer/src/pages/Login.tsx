import React, {useContext} from 'react';
import {Page} from '../components/Page';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography
} from '@material-ui/core';

import LoginImage from '../images/login.png'
import {FormattedMessage} from 'react-intl';
import {RoutePaths} from '../routes';
import {useHistory} from 'react-router';

const useStyles = makeStyles({
    card: {
        maxWidth: 600,
    },
    media: {
        height: 360,
        backgroundPosition: 'right',
    },
    actions: {
        justifyContent: 'space-between'
    }
});

export const Login: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();

    function gotoCreateAccount() {
        history.push(RoutePaths.AccountNew)
    }

    function gotoSetAccount() {
        history.push(RoutePaths.AccountSet)
    }

    return (
        <Page>
            <Card className={classes.card}>
                <CardActionArea>
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
                </CardActionArea>
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

