import EventEmitter from 'events'
import {InternalFileStructure} from '../../internalFileStructure';
import {set} from 'lodash';
import {logger} from '../../logger';

const EventName = 'AppSessionStore';

export const AppTransientStatePaths = {
    CurrentPublicKey: 'currentPublicKey',
    InternalFileStructure: 'ifs',
};

export interface AppTransientState {
    currentPublicKey: string,
    ifs: InternalFileStructure,
}

export type AppTransientStateStoreListener = (state: AppTransientState, path: string|null) => void

export class AppTransientStateStoreSubscription {
    constructor(private _store: AppTransientStateStore, private _ref: AppTransientStateStoreListener) {
    }

    public unsubscribe(): void {
        logger.debug(`Transient State: [${this._ref.name}] is unsubscribing...`);
        this._store.off(EventName, this._ref);
    }
}

const InitialState: AppTransientState = {
    currentPublicKey: '',
    ifs: new InternalFileStructure()
};

export class AppTransientStateStore extends EventEmitter {
    private _state: AppTransientState;

    constructor(initialState: AppTransientState = InitialState) {
        super();
        this.setMaxListeners(100);
        this._state = initialState;
    }

    get state(): AppTransientState {
        return this._state;
    }

    public set(path: string, value: any) {
        logger.debug(`Transient State Change: [${path}]`);
        set(this._state, path, value);
        this.emit(EventName, this.state, path)
    }

    public subscribe(fn: AppTransientStateStoreListener): AppTransientStateStoreSubscription {
        logger.debug(`Transient State: [${fn.name}] is subscribing`);
        this.on(EventName, fn);
        return new AppTransientStateStoreSubscription(this, fn)
    }
}

export const appTransientStateStore = new AppTransientStateStore();
