import Store from 'electron-store';
import {isDevelopment} from '../../utils/isDevelopment';
import * as path from 'path';
import {appStoreInstance} from '../../globals';

const schema = {
    users: {
        type: 'object',
        patternProperties: {
            "^[a-fA-F0-9]{64}$": {
                type: "object",
                properties: {
                    ifsCID: {
                        type: 'string'
                    },
                    lastModified: {
                        type: 'number'
                    }
                }
            }
        },
        default: {},
    },
};


// TODO: make it available as object in the transient store
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

