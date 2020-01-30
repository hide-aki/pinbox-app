import {InternalFileStructure} from './InternalFileStructure';
import {selectInternalFileStructure} from '../stores/transient/selectors';

export const withInternalFileStructure = (withIfsFn: (ifs: InternalFileStructure) => any): any => {
        return withIfsFn(selectInternalFileStructure())
};

