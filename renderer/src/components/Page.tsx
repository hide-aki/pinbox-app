import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
    },
});

export const Page: React.FC = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
};
