import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import { createBrowserHistory } from "history";
import 'react-toastify/dist/ReactToastify.min.css';
import { Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';

export const history = createBrowserHistory();

ReactDOM.render(

  <React.StrictMode>
    <Router history={history}>
      <ToastContainer position='bottom-left' />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
