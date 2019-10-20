import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    // @ts-ignore
    root: ({backgroundImage}) => ({
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
        minHeight: 'calc(100vh - 4rem - 64px)',
        background: `#f5f5f5 url(${backgroundImage}) no-repeat center`,
        backgroundSize: 'contain'
    }),
});

interface PageProps {
    backgroundImage?: string
}

export const Page: React.FunctionComponent<PageProps> = ({children, backgroundImage}) => {
    const classes = useStyles({backgroundImage});
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
};
