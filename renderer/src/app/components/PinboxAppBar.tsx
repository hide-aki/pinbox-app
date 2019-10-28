import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import AccountIcon from '@material-ui/icons/AccountBoxTwoTone';
import SettingsIcon from '@material-ui/icons/SettingsApplicationsTwoTone';
import {SearchBar} from './SearchBar';
import {useSelector} from 'react-redux';
import {selectCurrentAccount} from '../../features/account/selectors';
import {RoutePaths} from '../../routing/routes';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {formattingService} from '../../services/FormattingService';
import {useIntl} from 'react-intl';
import {Tooltip} from '@material-ui/core';

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
            "& h4": {
                marginRight: theme.spacing(1)
            }
        }
    }),
);

export const PinboxAppBar: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const account = useSelector(selectCurrentAccount);
    const intl = useIntl();
    const t = (id: string): string => intl.formatMessage({id});

    function gotoHome() {
        history.push(RoutePaths.Index)
    }

    function gotoSettings() {
        history.push(RoutePaths.Settings)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title={t("tooltip.home")}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={gotoHome}>
                            <HomeIcon/>
                        </IconButton>
                    </Tooltip>
                    <SearchBar/>
                    <div className={classes.grow}/>
                    {account &&
                    <Tooltip title={t("tooltip.account")}>
                      <Link className={classes.account} to={RoutePaths.Account}>
                        <h4>{`${formattingService.formatBurstBalance(account)} BURST`}</h4>
                        <AccountIcon/>
                      </Link>
                    </Tooltip>
                    }
                    <Tooltip title={t("tooltip.settings")}>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="settings"
                                    onClick={gotoSettings}>
                            <SettingsIcon/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    );
};
