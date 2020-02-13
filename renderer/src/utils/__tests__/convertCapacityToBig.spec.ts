import Big from 'big.js';
import {Capacity} from '../../typings/Capacity';
import {convertCapacityToBig} from '../convertCapacityToBig';

describe('capacityToBig', () => {

    it('should convert as expected', () => {
        let capacity : Capacity = {
            value: 1,
            unit: 'M'
        };
        expect(convertCapacityToBig({capacity})).toMatchObject(Big(1000**2));

        capacity = {
            value: 167,
            unit: ''
        };
        expect(convertCapacityToBig({capacity})).toMatchObject(Big(167))
    });


    it('should convert as expected with custom multiplier', () => {
        let capacity : Capacity = {
            value: 4,
            unit: 'G'
        };
        expect(convertCapacityToBig({capacity, multiplier: 1024})).toMatchObject(Big(4*1024**3))
    });
});
