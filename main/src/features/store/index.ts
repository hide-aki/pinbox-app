import Store from 'electron-store';
import {isDevelopment} from '../../util/isDevelopment';
import * as path from 'path';

const schema = {
    ifs: {
        type: 'object',
        properties: {
            tree: {
                type: 'object',
                default: {}
            }
        },
        default: { tree : {}}
    }
};

// TODO consider accountId
export function initializeAppStore() : Store {
    const cwd = isDevelopment() ? path.join(__dirname, '../../../') : undefined;
    // @ts-ignore
    const store = new Store({
        schema,
        cwd,
        name: 'pinbox.store'
    });

    // @ts-ignore
    global.appStore = store;
    return store;
}

