import { randomBytes } from "crypto";

export const randomString = () => {
    const random = randomBytes(32);
    return random.toString('base64').replace(/\//g,'_');
};

