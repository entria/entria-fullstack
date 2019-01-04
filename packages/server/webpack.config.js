/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
module.exports = require(`./webpack/webpack.${process.env.NODE_ENV}`);
