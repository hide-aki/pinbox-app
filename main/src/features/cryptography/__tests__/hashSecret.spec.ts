import {hashSecret} from '../hashSecret';


describe('hashSecret', () => {
    it('should hash correctly', async () => {
        const Salt = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
        const Secret = 'secret';
        let hashedResult = await hashSecret(Secret, Salt);
        expect(hashedResult).toEqual({
            raw: expect.any(String),
            hash: expect.any(String),
            salt: expect.any(String),
            type: 'argon2id',
            v: 19,
            m: 4096,
            t: 3,
            p: 1,
        });
    });
});
