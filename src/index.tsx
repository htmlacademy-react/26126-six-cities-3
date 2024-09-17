import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app/app';

const CARDS_COUNT = 5;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      cardsCount = {CARDS_COUNT}
    />
  </React.StrictMode>
);
