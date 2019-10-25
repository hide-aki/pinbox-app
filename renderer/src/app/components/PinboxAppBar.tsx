import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {SearchBar} from './SearchBar';
import {useSelector} from 'react-redux';
import {selectCurrentAccount} from '../../features/account/selectors';

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
    }),
);

export const PinboxAppBar: React.FC = () => {
    const classes = useStyles();
    const account = useSelector(selectCurrentAccount);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <SearchBar />
                    <div className={classes.grow} />
                    <h4>{account && account.accountRS}</h4>
                </Toolbar>
            </AppBar>
        </div>
    );
}