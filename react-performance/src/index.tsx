/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/07 23:02:43 (GMT+0900)
 */
// import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  // StrictMode causes rendering twice
  // <React.StrictMode>
  <Router>
    <App />
  </Router>
  // </React.StrictMode>
);
