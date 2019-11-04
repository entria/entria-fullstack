jest.mock('../src/relay/Environment', () => {
  // eslint-disable-next-line
  const { createMockEnvironment } = require('relay-test-utils');
  return createMockEnvironment();
});
