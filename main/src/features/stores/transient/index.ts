import {appTransientStateStore, AppTransientStateStoreSubscription} from './appTransientStateStore';
import {ifsListener} from './listeners/ifsListener';
import {currentPublicKeyListener} from './listeners/currentPublicKeyListener';

const subscriptions = new Array<AppTransientStateStoreSubscription>();

export function initializeTransientStore() : void {
    subscriptions.push(appTransientStateStore.subscribe(ifsListener));
    subscriptions.push(appTransientStateStore.subscribe(currentPublicKeyListener));
    // add more subscriptions if needed
}

export function uninitializeTransientStore() : void {
    subscriptions.forEach(s => s.unsubscribe())
}
