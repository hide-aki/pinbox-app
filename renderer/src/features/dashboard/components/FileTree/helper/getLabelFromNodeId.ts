import {isEmptyString} from '../../../../../utils/isEmptyString';

const NodeIdDelimiter = '/';

export const getLabelFromNodeId = (nodeId: string): string => {
    if(!nodeId) return '';

    const parts = nodeId.split(NodeIdDelimiter).filter( part => !isEmptyString(part));
    return parts.length ? parts[parts.length-1] : ''
};
