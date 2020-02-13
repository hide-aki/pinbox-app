import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {SettingsService} from './SettingsService';
import {defaultPeer} from '../app/burstPeers';
import {HttpError} from '@burstjs/http';
import {BrsErrorTranslationIdMap} from '../translations/brsTranslationIdMap';

export class BurstService {
    private readonly _api: Api;

    constructor() {
        const settings = new SettingsService().getSettings();
        const peer = settings ? settings.peer : defaultPeer;
        this._api = composeApi(new ApiSettings(peer))
    }

    get api() {
        return this._api;
    }

    public getTranslationIdForBrsError(e: HttpError): string {
        const slug = e.message.replace(/\(Code:.+\)/, '').trim().toLowerCase();
        // @ts-ignore
        const id = BrsErrorTranslationIdMap[slug];
        if (!id) {
            console.warn('Unknown BRS Error', e.message)
        }
        return !id ? 'error.brs.unknown_error' : id;
    }

    protected withBrsErrorTranslation<T>(fn: () => T): T {
        try {
            return fn()
        } catch (e) {
            throw e instanceof HttpError
                ? new Error(this.getTranslationIdForBrsError(e))
                : e
        }
    }
}
