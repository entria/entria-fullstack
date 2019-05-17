const babelJest = require('babel-jest');
const entriaBabel = require("@entria/babel");

module.exports = babelJest.createTransformer(entriaBabel);