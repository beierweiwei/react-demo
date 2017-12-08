import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Router from './router/index.js';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
// import {Test, Board, Square, Game} from './test.js';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

