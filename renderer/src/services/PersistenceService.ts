import {IPersistenceService} from '../typings/IPersistenceService';

export class PersistenceService implements IPersistenceService {
    storeItem(key: string, serializedData: string) {
        localStorage.setItem(key, serializedData);
    }

    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    removeItem(key: string) {
        localStorage.removeItem(key)
    }

    storeJsonObject(key: string, obj: object) {
        this.storeItem(key, JSON.stringify(obj))
    }

    getJsonObject(key: string): object | null {
        const serializedObj = this.getItem(key);
        return serializedObj ? JSON.parse(serializedObj) : null;
    }

    clear() {
        localStorage.clear();
    }
}

