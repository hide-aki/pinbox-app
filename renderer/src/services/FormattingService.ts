import {IntlShape} from 'react-intl';
import {convertNQTStringToNumber} from '@burstjs/util';

export class FormattingService {

    constructor(private intl:IntlShape) {}

    public formatBurstValue(planck: string, digits: number = 3) : string {
        return this.intl.formatNumber(convertNQTStringToNumber(planck || '0'), {
            maximumFractionDigits: digits,
            minimumFractionDigits: digits
        })
    }
}
