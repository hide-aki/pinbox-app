import React, {ReactNode} from 'react';
// @ts-ignore
import {ResponsiveBullet} from "@nivo/bullet"
import {makeStyles} from '@material-ui/core';
import Big from 'big.js';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const useStyles = makeStyles(theme => ({
        root: {
            padding: theme.spacing(4),
        },
        title: {
            textAlign: 'center',
            marginBottom: theme.spacing(2)
        },
        chart: {
            height: "48px"
        }
    })
);

interface BulletData {
    id: string | number
    title?: ReactNode
    subtitle?: ReactNode
    ranges: number[]
    measures: number[]
    markers: number[]
}

const MockData = [{
    id: 'capacity',
    title: <div/>,
    ranges: [100, 200, 400, 750, 800, 1500, 2000, 2300, 2350],
    measures: [25, 50, 400], // capacities
    markers: [800 * 0.8]
}];

interface CapacityChartProps {
    subscriptions: [],
    capacities: {
        none: Big,
        uploading: Big,
        synced: Big,
    }
}

// function mapChartData({subscriptions, capacities}: CapacityChartProps) : BulletData[] {
//     const ranges = subscriptions.reduce( (p, c) : Big => p.plus(c) , Big(0));
//     const measures= [capacities.none, capacities.uploading, capacities.synced];
//     const warningMarker = capacities.none.add(capacities.uploading).add(capacities.synced).mul(0.8);
//
//     return [{
//         id: 'capacity',
//         title: <div/>,
//         ranges,
//         measures,
//         markers: [warningMarker]
//     }]
// }

export const CapacityChart: React.FC<CapacityChartProps> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h5">
                    <FormattedMessage id="dashboard.capacity.title"/>
                </Typography>
            </div>
            <div className={classes.chart}>
                <ResponsiveBullet
                    data={MockData}
                    margin={{top: 0, right: 30, bottom: 20, left: 40}}
                    rangeColors="brown_blueGreen"
                    measureColors="yellow_orange_red"
                    markerColors="red"
                    animate
                />
            </div>
        </div>
    )
};
