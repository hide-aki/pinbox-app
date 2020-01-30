import {isDevelopment} from './isDevelopment';

export const isProduction =  () => !isDevelopment();
