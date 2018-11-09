import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const render = () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  ReactDOM.render(<App />, root);
};

render();
