import Big from 'big.js'
import {stackNumericArray} from '../stackNumericArray';

const asBig = (n:number) => new Big(n);

describe('stackNumericArray', () => {
    it('should sum up the numbers and stack them correctly', () => {
        const numerics = [10, 20, 30].map(asBig);
        const stacked = stackNumericArray(numerics);
        expect(stacked).toEqual([10,30,60].map(asBig))

    });
    it('should handle empty array correctly', () => {
        const numerics = [].map(asBig);
        const stacked = stackNumericArray(numerics);
        expect(stacked).toEqual([].map(asBig))
    })
});
