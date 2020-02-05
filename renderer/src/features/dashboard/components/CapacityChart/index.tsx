import React, {ReactNode} from 'react';
// @ts-ignore
import {ResponsiveBullet} from "@nivo/bullet"
import {makeStyles} from '@material-ui/core';
import Big from 'big.js';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';
import {scaleBigToNumber, ScaleBigToNumberParams} from './helper/scaleBigToNumber';
import {stackNumericArray} from './helper/stackNumericArray';
import {Unit} from '../../../../typings/Unit';

const useStyles = makeStyles(theme => ({
        title: {
            textAlign: 'center',
            marginBottom: theme.spacing(2)
        },
        chart: {
            height: "48px",
        },
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

interface CapacityChartProps {
    subscriptions: Big[],
    capacities: {
        none: Big,
        uploading: Big,
        synced: Big,
    }
}

const getScalerParameters = (value: Big): ScaleBigToNumberParams => ({value, fix: 'M', divider: 1024, dp: 3});
const mapUnit = (u: Unit): string => {
    const map = {K: 'Kilo', M: 'Mega', G: 'Giga', T: 'Tera', P: 'Peta'};
    // @ts-ignore
    return u === '' ? 'Byte' : `${map[u]}byte`
};

function calculateUsed(total: Big, {capacities: {uploading, synced, none}}: CapacityChartProps): string[] {
    const sumUsed = none.plus(uploading.plus(synced));
    const absolute = scaleBigToNumber(getScalerParameters(sumUsed)).toString(mapUnit);
    const relative = `${sumUsed.div(total).mul(100).toFixed(2)} %`;
    return [absolute, relative]
}

function mapChartData(props: CapacityChartProps): BulletData[] {

    const convert = (value: Big): number => scaleBigToNumber(getScalerParameters(value)).n;
    const ranges = stackNumericArray(props.subscriptions).map(convert);
    const measures = stackNumericArray([props.capacities.none, props.capacities.uploading, props.capacities.synced]).map(convert)

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
    const {subscriptions} = props;
    const subscriptionCount = subscriptions.length;
    const total = subscriptions.reduce((p, c) => p.plus(c), Big(0));
    const [absolute, relative] = calculateUsed(total, props);
    const chartData = mapChartData(props);

    const totalText = scaleBigToNumber(getScalerParameters(total)).toString(mapUnit);

    return (
        <React.Fragment>
            <div className={classes.title}>
                <Typography variant="caption">
                    <FormattedMessage
                        id="dashboard.capacity.caption"
                        values={{
                            subscriptionCount,
                            total: totalText,
                            usedAbsolute: absolute,
                            usedRelative: relative
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
        </React.Fragment>
    )
};
