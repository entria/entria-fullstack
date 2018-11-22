/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

module.exports = env => {
  const config = require(`./webpack/webpack.${env.mode}`);
  return config;
};
