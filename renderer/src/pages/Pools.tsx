import React from 'react';
import {PoolsTable} from '../components/PoolsTable';
import {Page} from '../components/Page';
import {makeStyles, Theme} from '@material-ui/core';
import PoolsBackgroundImage from '../images/background1.png';

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        width: "80%"
    }
}));

export const Pools: React.FC = () => {
    const classes = useStyle();
    return (
        <Page backgroundImage={PoolsBackgroundImage}>
            <div className={classes.root}>
                <PoolsTable/>
            </div>
        </Page>
    );
};

