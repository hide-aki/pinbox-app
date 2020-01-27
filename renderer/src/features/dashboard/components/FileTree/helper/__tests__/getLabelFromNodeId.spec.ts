import {getLabelFromNodeId} from '../getLabelFromNodeId';

describe('getLabelFromNodeId', () => {
    it('should get correct label', () => {
        expect(getLabelFromNodeId('')).toBe('');
        expect(getLabelFromNodeId('a')).toBe('a');
        expect(getLabelFromNodeId('a/b')).toBe('b');
        expect(getLabelFromNodeId('/a/b')).toBe('b');
    })
});
