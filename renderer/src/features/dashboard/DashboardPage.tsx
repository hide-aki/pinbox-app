import React from 'react';
import {Grid} from '@material-ui/core';
import {Page} from '../../components/Page';
import {CapacityWidget} from './widgets/capacity/CapacityWidget';
import {Widget} from '../../app/components/Widget';
import {FileStructureWidget} from './widgets/ifs/FileStructureWidget';

export const DashboardPage: React.FC = () =>
    (
        <Page>
            <Grid
                container
                direction='row'
                spacing={2}
            >
                <Grid item xs={12}>
                    <CapacityWidget/>
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

