import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './components/App'

ReactDOM.render(
	<App />
  ,
  document.getElementById('root')
);

registerServiceWorker();
