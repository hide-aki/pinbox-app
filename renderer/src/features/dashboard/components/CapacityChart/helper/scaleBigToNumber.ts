import Big from 'big.js';

export type Unit = '' | 'K' | 'M' | 'G' | 'T' | 'P'

export class ScaleBigToNumberResult {
    constructor(
        public n: number = 0,
        public u: Unit = ''
    ) {
    }

    toString(unitMapperFn?: (unit: Unit) => string) {
        const unit = unitMapperFn ? unitMapperFn(this.u) : this.u;
        return unit.length ? `${this.n} ${unit}` : `${this.n}`
    }
}

export interface ScaleBigToNumberParams {
    value: Big,
    fix?: Unit,
    divider?: number | Big
}

export function scaleBigToNumber({
                                value,
                                fix,
                                divider = 1000,
                            }: ScaleBigToNumberParams): ScaleBigToNumberResult {
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
    return new ScaleBigToNumberResult(+(b.toString()), units[i])
}
