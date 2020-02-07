import {PoolCosts} from '../../../typings/PoolCosts';
import {Unit} from '../../../typings/Unit';
import {SubscriptionOrder} from '../../../typings/SubscriptionOrder';
import Big from 'big.js'

const getUnitConversionFactor = (srcUnit: Unit, destUnit: Unit): number => {
    const Positions = {K: 0, M: 1, G: 2, T: 3, P: 4};
    // @ts-ignore
    const src = Positions[srcUnit];
    // @ts-ignore
    const dest = Positions[destUnit];
    return src === dest ? 1 : 1024 ** (src - dest);
};

const DayToSecs = 60 * 60 * 24;

export function calculateSubscriptionCosts(poolCosts: PoolCosts, order: SubscriptionOrder): Big {
    const {capacity, unit, burstPlanck, periodSecs} = poolCosts;
    const conversionFactor = getUnitConversionFactor(order.unit, unit);
    const normalizedOrderCapacity = Big(order.capacity).mul(conversionFactor).mul(capacity);
    if(order.periodSecs < periodSecs) throw new Error('Order period must not be less than Pool period')
    const periodFactor = Big(order.periodSecs).div(periodSecs);
    return normalizedOrderCapacity.mul(burstPlanck).mul(periodFactor)
}
