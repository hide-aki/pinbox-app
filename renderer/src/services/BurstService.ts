import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {SettingsService} from './SettingsService';
import {defaultPeer} from '../app/burstPeers';
import {HttpError} from '@burstjs/http';
import {BrsErrorTranslationIdMap} from '../translations/brsTranslationIdMap';
import {WithApiFn, withBurstApi} from '../utils/withBurstApi';
import {OnEventFn} from '../typings/OnEventFn';


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

    public getTranslationIdForError(e: HttpError): string {
        const slug = e.message.replace(/\(Code:.+\)/, '').trim().toLowerCase();
        // @ts-ignore
        const id = BrsErrorTranslationIdMap[slug];
        if (!id) {
            console.warn('Unknown BRS Error', e.message)
        }
        return !id ? 'error.brs.unknown_error' : id;
    }

    async withApi<T>(withApiFn: WithApiFn<T>, onError?: OnEventFn<Error>): Promise<T|void>{
        return withBurstApi(this)(withApiFn, onError)
    }
}
