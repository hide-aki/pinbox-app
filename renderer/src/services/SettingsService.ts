import {PersistenceService} from './PersistenceService';
import {IPersistenceService} from '../typings/IPersistenceService';
import {messages} from '../translations'
import {availablePeers} from '../app/burstPeers'

const ItemKey = 'settings';

export interface ISettings {
    readonly language: string
    readonly peer: string
}

export class SettingsService {
    constructor(private persistenceService: IPersistenceService = new PersistenceService()) {
    }

    storeSettings(settings: ISettings) {
        this.persistenceService.storeJsonObject(ItemKey, settings);
    }

    getSettings(): ISettings | null {
        return this.persistenceService.getJsonObject(ItemKey) as ISettings
    }

    getAvailableLanguages() : string[] {
        return Object.keys(messages)
    }

    getAvailablePeers() : string[] {
        return availablePeers
    }
}

export const settingsService = new SettingsService();

