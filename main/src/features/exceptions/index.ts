import {logger} from '../logger';

const finalizeUncaughtExceptions = (e: Error|any) => {
    logger.error(e);
    process.exit(666);
};

// ultimate instance of exception handling
process.on('uncaughtException', finalizeUncaughtExceptions);
process.on('unhandledRejection',finalizeUncaughtExceptions);

export const handleException = (e:Error) => {
    logger.error(e)
};
