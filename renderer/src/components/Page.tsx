import React from 'react';
import {makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
        // @ts-ignore
        root: ({backgroundImage}) => ({
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem',
            minHeight: 'calc(100vh - 4rem - 64px)',
            background: `#f5f5f5 url(${backgroundImage}) no-repeat center`,
            backgroundSize: 'contain',
            [theme.breakpoints.down('sm')]: {
                padding: '2rem 0 0 0'
            },
        }),
    })
);

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
