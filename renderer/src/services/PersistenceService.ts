import {IPersistenceService} from '../typings/IPersistenceService';

export class PersistenceService implements IPersistenceService {
    storeItem(key:string, serializedData:string){
        localStorage.setItem(key, serializedData);
    }

    getItem(key:string): string|null {
        return localStorage.getItem(key);
    }

    removeItem(key:string){
        localStorage.removeItem(key)
    }
}

