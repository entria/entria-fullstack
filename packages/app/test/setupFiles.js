const fetch = require('isomorphic-fetch');

global.window = {};

global.fetch = fetch;
