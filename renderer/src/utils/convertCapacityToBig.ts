import {Capacity} from '../typings/Capacity';
import Big from 'big.js';

export interface ConvertCapacityToBigArgs {
    capacity: Capacity,
    multiplier?: number | Big,
}

export const convertCapacityToBig = ({capacity, multiplier= 1000}: ConvertCapacityToBigArgs): Big => {
    const unitOrder = ['','K','M','G','T','P'];

    let i = unitOrder.indexOf(capacity.unit);
    let big = Big(capacity.value);
    while(i > 0){
        big = big.mul(multiplier);
        --i;
    }
    return big;
};
