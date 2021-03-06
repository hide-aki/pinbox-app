import * as path from 'path';
import {createLogger, transports as Transports, format} from 'winston';
import TransportStream from 'winston-transport';
import {isDevelopment} from '../../utils/isDevelopment';
import {NullTransport} from './NullTransport';

const isLoggingEnabled = (): boolean => {
    let isEnabled = false;
    process.argv.forEach(function (val) {
        if (val === '--log') {
            isEnabled = true;
        }
    });
    return isEnabled || isDevelopment();
};

const createFilename = (type: string): string => {
    const z = (n: number): string => n < 10 ? '0' + n : '' + n;

    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = z(date.getMonth() + 1);
    const DD = z(date.getDate());

    return path.join(process.cwd(), `pinbox-${YYYY}${MM}${DD}.${type}.log`);

};

const createTransports = (): TransportStream[] => {
    const transports: TransportStream[] = isLoggingEnabled()
        ? [
            new Transports.File({filename: createFilename('error'), level: 'error', handleExceptions: true}),
            new Transports.File({filename: createFilename('combined')})
        ]
        : [new NullTransport()];

    if (isLoggingEnabled()) {
        transports.push(new Transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }));
    }

    return transports;
};

export const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.prettyPrint(),
        format.errors({stack: true}),
    ),
    exitOnError: false,
    transports: createTransports()
});


