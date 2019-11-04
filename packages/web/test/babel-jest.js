const babelJest = require('babel-jest');

 module.exports = {
  canInstrument: true,

   getCacheKey(fileData, filename, configString, options) {
    return babelJest.getCacheKey(fileData, filename, configString, {
      ...options,
      config: { ...options.config, cwd: options.rootDir },
    });
  },

  process(src, filename, config, transformOptions) {
    return babelJest.process(
      src,
      filename,
      {
        ...config,
        cwd: config.rootDir,
      },
      transformOptions,
    );
  },
};