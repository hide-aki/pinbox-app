import {hashSecret} from '../hashSecret';


describe('hashSecret', () => {
    it('should hash correctly', () => {
        const Salt = 'someSalt';
        const Secret = 'secret';
        let hashedResult = hashSecret(Secret, Salt);
        expect(hashedResult.length).toBeGreaterThan(64);
        const priorlyHashed = hashedResult;
        hashedResult = hashSecret(Secret, Salt);
        expect(hashedResult).toEqual(priorlyHashed);
    });
});
