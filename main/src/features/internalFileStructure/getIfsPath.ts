import {join} from 'path'

export const getIfsPath = (publicKey: string): string => {
    return join(__dirname, '../../../', `${publicKey}.ifs`);
};
