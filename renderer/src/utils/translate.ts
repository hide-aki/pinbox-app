import {IntlShape} from 'react-intl';
export const translate = (intl : IntlShape) => (id: string, values?: Record<string, any>): string => intl.formatMessage({id}, values);
