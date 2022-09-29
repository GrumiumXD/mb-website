import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import './i18next';

import App from './App';

import './style/normalize-8.0.1.css';
import './style/global.css';
import './style/fonts/fonts.css';

import { LoaderFullscreen } from './components/Loader';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<LoaderFullscreen />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
