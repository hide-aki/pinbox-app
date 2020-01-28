import Store from 'electron-store';
import {isDevelopment} from '../../utils/isDevelopment';
import * as path from 'path';
import {appStoreInstance} from '../../globals';

const schema = {
    ifs: {
        type: 'object',
        properties: {
            records: {
                type: 'object',
                properties: {
                    root: {
                        type: 'object'
                    }
                }
            },
            lastModified: {
                type: 'number',
            },
            publicKey: {
                type: 'string',
            }
        },
        default: {
            lastModified: Date.now(),
            publicKey: '',
            records: {root: {}}
        }
    }
};

export function createAppStore(): Store {
    let store = appStoreInstance();
    if (store) {
        return store;
    }
    const cwd = isDevelopment() ? path.join(__dirname, '../../../') : undefined;
    // @ts-ignore
    store = new Store({
        schema,
        cwd,
        name: 'pinbox.store'
    });

    // @ts-ignore
    global.appStore = store;
    return store;
}

