module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-hot-loader/babel',
    'babel-plugin-styled-components',
    [
      'relay',
      {
        schema: '../server/data/schema.json',
      },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      plugins: [
        '@babel/plugin-transform-runtime',
        'dynamic-import-node',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
      ],
    },
  },
};
