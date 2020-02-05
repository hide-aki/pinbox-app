import {PersistenceService} from './PersistenceService';
import {messages} from '../translations'
import {availablePeers} from '../app/burstPeers'

const ItemKey = 'settings';

export interface ISettings {
    readonly language: string
    readonly peer: string
    readonly inactivityTimeout: number
}

export class SettingsService {
    constructor(private persistenceService: PersistenceService = new PersistenceService()) {
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

