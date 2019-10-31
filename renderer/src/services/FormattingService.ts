import {Account} from '@burstjs/core';
import {useIntl} from 'react-intl';
import {convertNQTStringToNumber} from '@burstjs/util';

export class FormattingService {
    public formatBurstBalance({balanceNQT}: Account) : string {
        return useIntl().formatNumber(convertNQTStringToNumber(balanceNQT || '0'), {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3
        })
    }
}

export const formattingService = new FormattingService();
