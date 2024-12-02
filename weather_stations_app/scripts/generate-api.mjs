import pkg from 'path-browserify';
const { resolve } = pkg;

import { generateApi } from 'swagger-typescript-api';

generateApi({
    name: 'Api.ts',
    output: resolve('./src/api'),
    url: 'http://0.0.0.0:8000/swagger/?format=openapi',
    httpClientType: 'axios',
});