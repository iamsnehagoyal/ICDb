import path from 'path';

export const BASE_DIR = path.dirname(path.dirname(__filename));

export const SECRET_KEY = 'any-long-string';

export const DEBUG = true;

export const DATABASES = {
    default: {
        uri: 'mongodb://localhost:27017/icdb',
        options: {}
    }
}
