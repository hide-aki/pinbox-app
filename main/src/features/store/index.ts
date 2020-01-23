import Store from 'electron-store';
import {isDevelopment} from '../../util/isDevelopment';
import * as path from 'path';

const schema = {
    ifs: {
        type: 'object',
        default: {}
    }
};

export function initializeAppStore() : Store {
    const cwd = isDevelopment() ? path.join(__dirname, '../../../') : undefined;
    // @ts-ignore
    const store = new Store({
        schema,
        cwd,
    });

    // @ts-ignore
    global.appStore = store;
    return store;
}

