export enum ErrorCodes {
    Unkown,
    NoSecret,
    FileNotFound,
}

export class MainError extends Error {
    constructor(message:string, public code: ErrorCodes) {
        super(message);
    }
}

export class FileNotFoundError extends MainError{
    constructor(message:string, public code: ErrorCodes = ErrorCodes.FileNotFound ) {
        super(`File not found: ${message}`, code);
    }
}


export class NoSecretError extends MainError{
    constructor(message:string, public code: ErrorCodes = ErrorCodes.NoSecret ) {
        super(`Could not gather the secret: ${message}`, code);
    }
}
