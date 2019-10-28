import {PersistenceService} from './PersistenceService';
import {IPersistenceService} from '../typings/IPersistenceService';
import {messages} from '../translations'


const ItemKey = 'settings';

export interface ISettings {
    readonly language: string
}

export class SettingsService {
    constructor(private persistenceService: IPersistenceService = new PersistenceService()) {
    }

    storeSettings(settings: ISettings) {
        this.persistenceService.storeJsonObject(ItemKey, settings);
    }

    getLanguage(): ISettings | null {
        return this.persistenceService.getJsonObject(ItemKey) as ISettings
    }

    getAvailableLanguages() : string[] {
        return Object.keys(messages)
    }
}

