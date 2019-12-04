/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const { FileStore } = require('metro-cache');

const getWorkspaces = require('get-yarn-workspaces');
const blacklist = require('metro-config/src/defaults/blacklist');

const workspaces = getWorkspaces(__dirname);

module.exports = {
  projectRoot: path.resolve(__dirname, '.'),

  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    ...workspaces,
  ],

  resolver: {
    blacklistRE: blacklist(
      workspaces.filter(workspacePath => workspacePath.indexOf('packages/app') === -1).map(
        workspacePath =>
          new RegExp(
            `^${escape(path.resolve(__dirname, workspacePath, 'node_modules'))}\\/.*$`
          ),
      ),
    ),
    // https://github.com/facebook/metro/issues/1#issuecomment-453450709
    extraNodeModules: new Proxy({}, {
      get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
    }),
  },

  // http://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059#faster-app-launches-with-inline-requires
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },

  // cacheStores: [
  //   new FileStore({
  //     root: path.join(__dirname, 'metro-cache'),
  //   }),
  // ],

};
