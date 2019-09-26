var replace = require('replace'),
    path = require("path");

replace({
    regex: 'http:\/\/192.[0-9].........api\/',
    replacement: '/api/',
    paths: ['store/index.ts'],
    recursive: false
});