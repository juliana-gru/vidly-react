import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';


import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


require('dotenv').config()
console.log('ENV', process.env.REACT_APP_API_URL);
console.log(process.env.PORT);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
