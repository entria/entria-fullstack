// @flow

/**
  List of static events supported by the worker
  Each event is described by a unique string (listed below)
  This is a common file between the Server and the Workers in order to avoid typos.
*/

const EVENTS = {
  // User-initiated tasks
  USER: {
    EMAIL: {
      SIGN_UP: 'USER:EMAIL:SIGN_UP',
    },
  },
};

export default EVENTS;
