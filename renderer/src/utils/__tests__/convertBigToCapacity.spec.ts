import Big from 'big.js';
import {convertBigToCapacity} from '../convertBigToCapacity';
import {Unit} from '../../typings/Unit';

describe('convertBigToCapacity', () => {
    it('Should return correct number with unit', () => {
        let r = convertBigToCapacity({value: Big(0)});
        expect(r.value).toEqual(0);
        expect(r.unit).toEqual('K');

        r = convertBigToCapacity({value: Big(1250)});
        expect(r.value).toEqual(1.25);
        expect(r.unit).toEqual('K');

        r = convertBigToCapacity({value: Big(2048), divider: 1024});
        expect(r.value).toEqual(2);
        expect(r.unit).toEqual('K');

        r = convertBigToCapacity({value: Big(12500)});
        expect(r.value).toEqual(12.5);
        expect(r.unit).toEqual('K');


        r = convertBigToCapacity({value: Big(125000000)});
        expect(r.value).toEqual(125);
        expect(r.unit).toEqual('M');

        r = convertBigToCapacity({value: Big('125345000000')});
        expect(r.value).toEqual(125.345);
        expect(r.unit).toEqual('G');
    });

    it('Should return correct result with _fixed_ r.unit', () => {
        let r = convertBigToCapacity({value: Big(0), fix: 'K'});
        expect(r.value).toEqual(0);
        expect(r.unit).toEqual('K');

        r = convertBigToCapacity({value: Big(1250), fix: 'K'});
        expect(r.value).toEqual(1.25);
        expect(r.unit).toEqual('K');

        r = convertBigToCapacity({value: Big(12500), fix: 'K'});
        expect(r.value).toEqual(12.5);
        expect(r.unit).toEqual('K');


        r = convertBigToCapacity({value: Big(125000000), fix: 'K'});
        expect(r.value).toEqual(125000);
        expect(r.unit).toEqual('K');

        r = convertBigToCapacity({value: Big('125345000000'), fix: 'K'});
        expect(r.value).toEqual(125345000);
        expect(r.unit).toEqual('K');

        r = convertBigToCapacity({value: Big('125345000000'), fix: 'M'});
        expect(r.value).toEqual(125345);
        expect(r.unit).toEqual('M');

        r = convertBigToCapacity({value: Big('125345000000'), fix: 'G'});
        expect(r.value).toEqual(125.345);
        expect(r.unit).toEqual('G');

        r = convertBigToCapacity({value: Big('125345000000'), fix: 'T'});
        expect(r.value).toEqual(0.125);
        expect(r.unit).toEqual('T');

        r = convertBigToCapacity({value: Big('125345000000'), fix: 'T', dp:6});
        expect(r.value).toEqual(0.125345);
        expect(r.unit).toEqual('T');
    });

    describe('BigToNumberResult', () => {
        it('Should convert to String using default param', () => {
            let result = convertBigToCapacity({value: Big(0)});
            expect(result.toString()).toEqual('0 K');
            result = convertBigToCapacity({value: Big(1250)});
            expect(result.toString()).toEqual('1.25 K');
        });
        it('Should convert to String using mapper', () => {
            const mapperFn = (u: Unit): string => {
                const unitMap = {K: 'KiB', M: 'MiB'};
                // @ts-ignore
                return unitMap[u]
            };
            const result = convertBigToCapacity({value: Big(1250)});
            expect(result.toString(mapperFn)).toEqual('1.25 KiB');
        })
    })
});
