import Transport from 'winston-transport';

export class NullTransport extends Transport {

    constructor(options = {}) {
        super(options);
    }

    log(info: any, next: () => void): any {
        // noop
        next()
    }
}
