import Big from 'big.js';
import {Unit} from '../typings/Unit';
import {Capacity} from '../typings/Capacity';

export class EnhancedCapacity implements Capacity{
    constructor(
        public value: number = 0,
        public unit: Unit = ''
    ) {

    }

    toString(unitMapperFn?: (unit: Unit) => string) {
        const unit = unitMapperFn ? unitMapperFn(this.unit) : this.unit;
        return unit.length ? `${this.value} ${unit}` : `${this.value}`
    }
}

export interface ConvertBigToCapacityArgs {
    value: Big,
    fix?: Unit,
    divider?: number | Big,
    dp?: number,
}

export function convertBigToCapacity({
                                value,
                                fix,
                                divider = 1000,
                                dp = 3
                            }: ConvertBigToCapacityArgs): EnhancedCapacity {
    const units = ['', 'K', 'M', 'G', 'T', 'P'];
    let b = value;
    let i = 0;
    while (true) {
        b = b.div(divider);
        ++i;
        if(fix && units[i] === fix) break;
        if(!fix && (b.lt(divider) || i > units.length)) break;
    }
    // @ts-ignore
    return new EnhancedCapacity(+(b.toFixed(dp)), units[i])
}
