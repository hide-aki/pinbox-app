import Big from 'big.js';
import {scaleBigToNumber, ScaleBigToNumberResult, Unit} from '../scaleBigToNumber';

describe('bigToNumber', () => {
    it('Should return correct number with unit', () => {
        let result = scaleBigToNumber({value: Big(0)});
        expect(result.n).toEqual(0);
        expect(result.u).toEqual('K');

        result = scaleBigToNumber({value: Big(1250)});
        expect(result.n).toEqual(1.25);
        expect(result.u).toEqual('K');

        result = scaleBigToNumber({value: Big(12500)});
        expect(result.n).toEqual(12.5);
        expect(result.u).toEqual('K');


        result = scaleBigToNumber({value: Big(125000000)});
        expect(result.n).toEqual(125);
        expect(result.u).toEqual('M');

        result = scaleBigToNumber({value: Big('125345000000')});
        expect(result.n).toEqual(125.345);
        expect(result.u).toEqual('G');
    });

    it('Should return correct result with _fixed_ unit', () => {
        let result = scaleBigToNumber({value: Big(0), fix: 'K'});
        expect(result.n).toEqual(0);
        expect(result.u).toEqual('K');

        result = scaleBigToNumber({value: Big(1250), fix: 'K'});
        expect(result.n).toEqual(1.25);
        expect(result.u).toEqual('K');

        result = scaleBigToNumber({value: Big(12500), fix: 'K'});
        expect(result.n).toEqual(12.5);
        expect(result.u).toEqual('K');


        result = scaleBigToNumber({value: Big(125000000), fix: 'K'});
        expect(result.n).toEqual(125000);
        expect(result.u).toEqual('K');

        result = scaleBigToNumber({value: Big('125345000000'), fix: 'K'});
        expect(result.n).toEqual(125345000);
        expect(result.u).toEqual('K');

        result = scaleBigToNumber({value: Big('125345000000'), fix: 'M'});
        expect(result.n).toEqual(125345);
        expect(result.u).toEqual('M');

        result = scaleBigToNumber({value: Big('125345000000'), fix: 'G'});
        expect(result.n).toEqual(125.345);
        expect(result.u).toEqual('G');

        result = scaleBigToNumber({value: Big('125345000000'), fix: 'T'});
        expect(result.n).toEqual(0.125);
        expect(result.u).toEqual('T');

        result = scaleBigToNumber({value: Big('125345000000'), fix: 'T', dp:6});
        expect(result.n).toEqual(0.125345);
        expect(result.u).toEqual('T');
    });

    describe('BigToNumberResult', () => {
        it('Should convert to String using default param', () => {
            let result = scaleBigToNumber({value: Big(0)});
            expect(result.toString()).toEqual('0 K');
            result = scaleBigToNumber({value: Big(1250)});
            expect(result.toString()).toEqual('1.25 K');
        });
        it('Should convert to String using mapper', () => {
            const mapperFn = (u: Unit): string => {
                const unitMap = {K: 'KiB', M: 'MiB'};
                // @ts-ignore
                return unitMap[u]
            };
            const result = scaleBigToNumber({value: Big(1250)});
            expect(result.toString(mapperFn)).toEqual('1.25 KiB');
        })
    })
});
