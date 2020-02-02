import {app, remote} from 'electron'
import {join} from 'path'
import {isDevelopment} from '../../utils/isDevelopment';

export const getIfsPath = (publicKey: string): string => {
    const filename = `${publicKey}.ifs`;
    return isDevelopment() ?
        join(__dirname, '../../../', filename) :
        join((app || remote.app).getPath('userData'), filename);
};
