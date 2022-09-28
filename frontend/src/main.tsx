import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './style/normalize-8.0.1.css';
import './style/global.css';
import './style/fonts/fonts.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
