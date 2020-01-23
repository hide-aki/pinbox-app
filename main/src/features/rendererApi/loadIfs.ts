import {createAppStore} from '../store';

export function loadIfs(): object {
    const store = createAppStore();
    return store.get('ifs')
}
