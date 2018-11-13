const { workspaces = [] } = require('./package.json');

module.exports = {
  babelrcRoots: workspaces.packages || workspaces
};
