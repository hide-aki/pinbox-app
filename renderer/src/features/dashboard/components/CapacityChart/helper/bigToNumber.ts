import Big from 'big.js';

export interface BigToNumberResult {
    n: number,
    u: '-' | 'K' | 'M' | 'G' | 'T'
}

export function bigToNumber(big: Big, divider:number = 1000): BigToNumberResult {
    const units = ['-', 'K', 'M', 'G', 'T'];
    const lvl = Math.ceil(big.e / 3);

    let b = big;
    let i = 0;
    while(b.gt(divider) && i < units.length){
        b = b.div(divider);
        ++i;
    }

    return {
        // @ts-ignore
        n: +(b.toString()),
        // @ts-ignore
        u: units[i]
    };
}
