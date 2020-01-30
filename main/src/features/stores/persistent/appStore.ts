import Store from 'electron-store';
import {isDevelopment} from '../../../utils/isDevelopment';
import * as path from 'path';

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

export function createAppStore(): Store {
    const cwd = isDevelopment() ? path.join(__dirname, '../../../') : undefined;
    // @ts-ignore
    const store = new Store({
        schema,
        cwd,
        name: 'pinbox.store'
    });

    // @ts-ignore
    global.singletons.appStore = store;
    return store;
}

