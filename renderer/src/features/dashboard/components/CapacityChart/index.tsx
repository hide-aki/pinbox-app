import React, {ReactNode} from 'react';
// @ts-ignore
import {ResponsiveBullet} from "@nivo/bullet"
import {makeStyles} from '@material-ui/core';
import Big from 'big.js';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';
import {scaleBigToNumber} from './helper/scaleBigToNumber';
import {stackNumericArray} from './helper/stackNumericArray';

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
        },
        chartContainer: {
            display: "flex",
            flexDirection: "row"
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
    subscriptions: Big[],
    capacities: {
        none: Big,
        uploading: Big,
        synced: Big,
    }
}


function calculateTotal(props: CapacityChartProps): string {
    const {subscriptions} = props;

    const sumBytes = subscriptions
        .reduce((p: Big, c: Big): Big => p.plus(c), Big(0));

    return scaleBigToNumber({value: sumBytes, fix: 'M'}).toString();
}

interface UsedResult {
    absolute: string,
    relative: string
}

function calculateUsed(props: CapacityChartProps): UsedResult {
    return {
        absolute: '0',
        relative: '0 %'
    }
}

function mapChartData(props: CapacityChartProps): BulletData[] {

    const convert = (value: Big): number => scaleBigToNumber({value, fix: 'M'}).n;

    const ranges = stackNumericArray(props.subscriptions).map(convert);
    const measures = stackNumericArray([props.capacities.none, props.capacities.uploading,props.capacities.synced]).map(convert)

    return [{
        id: 'capacity',
        title: <div/>,
        ranges,
        measures,
        markers: []
    }]
}

export const CapacityChart: React.FC<CapacityChartProps> = (props) => {
    const classes = useStyles();

    const subscriptionCount = props.subscriptions.length;
    const total = calculateTotal(props);
    const used = calculateUsed(props);
    const chartData = mapChartData(props);

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h5">
                    <FormattedMessage id="dashboard.capacity.title"/>
                </Typography>
                <Typography variant="caption">
                    <FormattedMessage
                        id="dashboard.capacity.caption"
                        values={{
                            subscriptionCount,
                            total,
                            usedAbs: used.absolute,
                            usedRel: used.relative
                        }}
                    />
                </Typography>
            </div>
            <div className={classes.chart}>
                <ResponsiveBullet
                    data={chartData}
                    margin={{top: 0, right: 30, bottom: 20, left: 40}}
                    rangeColors="brown_blueGreen"
                    measureColors="yellow_orange_red"
                    markerColors="red"
                    isInteractive={false}
                    animate
                />
            </div>
        </div>
    )
};
