import React from 'react';
import {PoolsTable} from './PoolsTable';
import {Page} from '../../components/Page';
import {makeStyles, Theme} from '@material-ui/core';
import PoolsBackgroundImage from '../../images/background1.png';
import {selectAvailablePools} from './selectors';
import {useSelector} from 'react-redux';
import {PoolDescription} from '../../typings/PoolDescription';

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        width: "80%"
    }
}));

export const PoolsPage: React.FC = () => {
    const classes = useStyle();
    const availablePools = useSelector<any, PoolDescription[]>(selectAvailablePools);
    return (
        <Page backgroundImage={PoolsBackgroundImage}>
            <div className={classes.root}>
                <PoolsTable pools={availablePools}/>
            </div>
        </Page>
    );
};

