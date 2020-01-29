import EventEmitter from 'events'
import {InternalFileStructure} from '../internalFileStructure';
import {set} from 'lodash';

const EventName = 'AppSessionStore';

export interface AppTransientState {
    currentPublicKey: string,
    ifs: InternalFileStructure,
}

export type AppTransientStateStoreListener = (state: AppTransientState, path: string|null) => void

export class AppTransientStateStoreSubscription {
    constructor(private _store: AppTransientStateStore, private _ref: AppTransientStateStoreListener) {
    }

    public unsubscribe(): void {
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
        set(this._state, path, value);
        this.emit(EventName, this.state, path)
    }

    public subscribe(fn: AppTransientStateStoreListener): AppTransientStateStoreSubscription {
        this.on(EventName, fn);
        return new AppTransientStateStoreSubscription(this, fn)
    }
}
