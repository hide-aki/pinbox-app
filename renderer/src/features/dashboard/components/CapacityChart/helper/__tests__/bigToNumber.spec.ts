import Big from 'big.js';
import {bigToNumber} from '../bigToNumber';

describe('bigToNumber', () => {
    it('Should return correct number with unit', () => {
        let result = bigToNumber(Big(0));
        expect(result).toEqual({
            n: 0,
            u: '-'
        });
        result = bigToNumber(Big(1250));
        expect(result).toEqual({
            n: 1.250,
            u: 'K'
        });
        result = bigToNumber(Big(12500));
        expect(result).toEqual({
            n: 12.5,
            u: 'K'
        });
        result = bigToNumber(Big(125000000));
        expect(result).toEqual({
            n: 125,
            u: 'M'
        });
        result = bigToNumber(Big('125345000000'));
        expect(result).toEqual({
            n: 125.345,
            u: 'G'
        })
    })
});
