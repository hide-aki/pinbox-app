import {PoolCosts} from '../../../../typings/PoolCosts';
import {convertNumberToNQTString} from '@burstjs/util';
import {SubscriptionOrder} from '../../../../typings/SubscriptionOrder';
import {SecondsPerDay} from '../../../../utils/constants';
import {calculateSubscriptionCosts} from '../calculateCosts';
import Big from 'big.js';

const Costs: PoolCosts = {
    burstPlanck: convertNumberToNQTString(1),
    unit: 'M',
    value: 1,
    periodSecs: SecondsPerDay
};

describe('calculateCosts', () => {

    it('should correctly calculate the subscription costs - 1Burst / 1MB / 1Day', () => {

        const order: SubscriptionOrder = {
            periodSecs: SecondsPerDay,
            capacity: 1,
            unit: 'M'
        };

        const expected = Big(convertNumberToNQTString(1));
        const result = calculateSubscriptionCosts(Costs, order);
        expect(result.eq(expected)).toBeTruthy()

    });

    it('should correctly calculate the subscription costs - 1Burst / 5GB / 1Month', () => {
        const order: SubscriptionOrder = {
            periodSecs: SecondsPerDay * 30,
            capacity: 5,
            unit: 'G'
        };

        const expected = Big(convertNumberToNQTString(5 * 1024 * 30));
        const result = calculateSubscriptionCosts(Costs, order);
        expect(result.eq(expected)).toBeTruthy()
    });

    it('should correctly calculate the subscription costs - 1Burst / 100KB / 1Month', () => {
        const order: SubscriptionOrder = {
            periodSecs: SecondsPerDay * 30,
            capacity: 100,
            unit: 'K'
        };

        const expected = Big(convertNumberToNQTString(100 * (1 / 1024) * 30));
        const result = calculateSubscriptionCosts(Costs, order);
        expect(result.eq(expected)).toBeTruthy()
    });

    it('should throw error if order period is less than pool period', () => {
        const order: SubscriptionOrder = {
            periodSecs: 100,
            capacity: 5,
            unit: 'G'
        };
        try {
            calculateSubscriptionCosts(Costs, order);
            expect('Should throw exception').toBeFalsy()
        } catch (e) {
            expect(e.message).toContain('Order period must not be less than a day')
        }
    });

    it('should throw error if pool costs its too low', () => {
        const order: SubscriptionOrder = {
            periodSecs: SecondsPerDay * 10,
            capacity: 5,
            unit: 'G'
        };
        const testCosts = {...Costs, burstPlanck: '1000'};

        try {
            calculateSubscriptionCosts(testCosts, order);
            expect('Should throw exception').toBeFalsy()
        } catch (e) {
            expect(e.message).toContain('Pool costs must be greater than lowest fee ')
        }
    })
});
