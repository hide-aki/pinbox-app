import {
    AppTransientState,
    AppTransientStatePaths,
    AppTransientStateStore,
    appTransientStateStore
} from './appTransientStateStore';
import {InternalFileStructure} from '../../internalFileStructure';

const select = <T>(store: AppTransientStateStore = appTransientStateStore): AppTransientState => store.state;

export const selectCurrentPublicKey = (assert:boolean = true) : string  => {
    // @ts-ignore
    const publicKey = select<string>()[AppTransientStatePaths.CurrentPublicKey];
    if(assert && !publicKey){
        throw new Error(`[${AppTransientStatePaths.CurrentPublicKey}] not available yet`)
    }
    return publicKey;
};

export const selectIfs = () : InternalFileStructure  => select<InternalFileStructure>().ifs;
