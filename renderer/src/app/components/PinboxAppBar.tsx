import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import AccountIcon from '@material-ui/icons/AccountBoxTwoTone';
import {SearchBar} from './SearchBar';
import {useSelector} from 'react-redux';
import {selectCurrentAccount} from '../../features/account/selectors';
import {RoutePaths} from '../../routing/routes';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {formattingService} from '../../services/FormattingService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        grow: {
            flexGrow: 1,
        },
        account: {
            color: "white",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            "& h4" : {
                marginRight: theme.spacing(1)
            }
        }
    }),
);

export const PinboxAppBar: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const account = useSelector(selectCurrentAccount);

    function gotoHome() {
        history.push(RoutePaths.Index)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={gotoHome}>
                        <HomeIcon/>
                    </IconButton>
                    <SearchBar/>
                    <div className={classes.grow}/>
                    {account &&
                    <React.Fragment>
                      <Link className={classes.account} to={RoutePaths.Account}>
                        <h4>{`${formattingService.formatBurstBalance(account)} BURST`}</h4>
                        <AccountIcon/>
                      </Link>
                    </React.Fragment>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
