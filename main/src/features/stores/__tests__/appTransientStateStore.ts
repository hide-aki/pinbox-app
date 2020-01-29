import {AppTransientStateStore} from '../transient/appTransientStateStore';

describe('AppTransientStateStore', () => {
    it('should be possible to subscribe and receive the events', () => {
        const store = new AppTransientStateStore();
        const listener = jest.fn();
        const subscription = store.subscribe(listener);
        store.set('currentPublicKey', 'publicKey');
        expect(listener).toBeCalledWith({currentPublicKey: 'publicKey', ifs: expect.any(Object)}, 'currentPublicKey')
        expect(listener).toBeCalledTimes(1);
        subscription.unsubscribe();
        store.set('currentPublicKey', 'foo');
        expect(listener).toBeCalledTimes(1);
        expect(store.state.currentPublicKey).toBe('foo')
    })
});
