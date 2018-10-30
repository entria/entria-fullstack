// this file is ran right after the test framework is setup for some test file.

// logger import on graphql app.js
jest.mock('../src/core/logger');

global.fetch = require('jest-fetch-mock');
