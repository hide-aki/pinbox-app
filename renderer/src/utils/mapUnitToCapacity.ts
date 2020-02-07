import {Unit} from '../typings/Unit';

export const mapUnitToCapacity = (u: Unit): string => {
    const map = {K: 'Kilo', M: 'Mega', G: 'Giga', T: 'Tera', P: 'Peta'};
    // @ts-ignore
    return u === '' ? 'Byte' : `${map[u]}byte`
};
