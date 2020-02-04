import Big from 'big.js';

export function stackNumericArray(numericValues: Big[]): Big[] {
    return numericValues.reduce((p, c) => {
        const previousTail = p.length ? p[p.length - 1] : Big(0);
        return p.concat(previousTail.plus(c))
    }, [] as Big[]);
}
