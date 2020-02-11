import React from 'react';
import {Grid} from '@material-ui/core';
import {Page} from '../../components/Page';
import {Widget} from '../../app/components/Widget';
import {useSelector} from 'react-redux';
import {currentAccountSelector} from '../account/selectors';
import {CapacityWidget} from './widgets/capacity/CapacityWidget';
import {FileStructureWidget} from './widgets/ifs/FileStructureWidget';
import {ClaimFreeSpaceWidget} from './widgets/claimFreeSpace/ClaimFreeSpaceWidget';
import {ClaimState} from '../../typings/BurstAccount';

export const DashboardPage: React.FC = () =>{
    const account = useSelector(currentAccountSelector);
    let TopWidget = account.claimSpaceState !== ClaimState.Claimed ? ClaimFreeSpaceWidget : CapacityWidget;

    return (
        <Page>
            <Grid
                container
                direction='row'
                spacing={2}
            >
                <Grid item xs={12}>
                    <TopWidget/>
                </Grid>
                <Grid item xs={8}>
                    <FileStructureWidget/>
                </Grid>
                <Grid item xs={4}>
                    <Widget title="Details" subtitle="Some details here">
                        <h2>Details</h2>
                    </Widget>
                </Grid>
            </Grid>
        </Page>
    );
}

