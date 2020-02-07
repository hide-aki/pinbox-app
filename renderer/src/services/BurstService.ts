import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {SettingsService} from './SettingsService';
import {defaultPeer} from '../app/burstPeers';

export class BurstService {

    private _api: Api;

    constructor() {
        const settings = new SettingsService().getSettings();
        const peer = settings ? settings.peer : defaultPeer;
        this._api = composeApi(new ApiSettings(peer))
    }

    get api () { return this._api; }
}
