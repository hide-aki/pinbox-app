import {PoolCosts} from '../../../typings/PoolCosts';
import {Unit} from '../../../typings/Unit';
import {SubscriptionOrder} from '../../../typings/SubscriptionOrder';
import Big from 'big.js'
import {FeeQuantPlanck} from '@burstjs/core';
import {SecondsPerDay} from '../../../utils/constants';

const getUnitConversionFactor = (srcUnit: Unit, destUnit: Unit): number => {
    const Positions = {K: 0, M: 1, G: 2, T: 3, P: 4};
    // @ts-ignore
    const src = Positions[srcUnit];
    // @ts-ignore
    const dest = Positions[destUnit];
    return src === dest ? 1 : 1024 ** (src - dest);
};

export function getCostsPerDay(costs: PoolCosts): Big {
    const f = costs.periodSecs / SecondsPerDay;
    return Big(costs.burstPlanck).div(f);
}

export function getCostsPerMonth(costs: PoolCosts): Big {
    return getCostsPerDay(costs).mul(30);
}

export function calculateSubscriptionCosts(poolCosts: PoolCosts, order: SubscriptionOrder): Big {
    const {value, unit, burstPlanck} = poolCosts;
    if (Big(burstPlanck).lte(FeeQuantPlanck)) throw new Error(`Pool costs must be greater than lowest fee (${FeeQuantPlanck})`)
    if (order.periodSecs < SecondsPerDay) throw new Error(`Order period must not be less than a day (${SecondsPerDay})`);

    const conversionFactor = getUnitConversionFactor(order.unit, unit);
    const normalizedOrderCapacity = Big(order.capacity).mul(conversionFactor).mul(value);
    const costsPerDay = getCostsPerDay(poolCosts);
    const days = Big(order.periodSecs).div(SecondsPerDay);
    return normalizedOrderCapacity.mul(costsPerDay).mul(days)
}
