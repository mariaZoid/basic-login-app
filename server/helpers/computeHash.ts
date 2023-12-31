import * as crypto from 'crypto';

export const computeHash = (value: string): string => {
    return crypto.createHash('md5').update(value).digest('hex');
};