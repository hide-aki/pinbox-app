import TransportStream from 'winston-transport'

export class NullTransport extends TransportStream{
    constructor() {
        super();
    }
    log(info:any, next: () => void) : any {
        // NOOP - Do Nothing!
        next()
    }
}
