export interface IPersistenceService {
    storeItem(key: string, serializedData: string): void;

    getItem(key: string): string | null;

    removeItem(key: string): void

    removeItem(key: string): void

    storeJsonObject(key: string, obj: object): void

    getJsonObject(key: string): object | null

    clear(): void
}
