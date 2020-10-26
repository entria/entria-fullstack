/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

module.exports = (env) => {
  let mode = 'dev';

  if (env.prod) {
    mode = 'prod';
  } else if (env.common) {
    mode = 'common';
  }

  const config = require(`./webpack/webpack.${mode}`);
  return config;
};
