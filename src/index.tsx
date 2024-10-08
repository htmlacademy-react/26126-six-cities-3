import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from '../src/components/app/app';

import {favoriteOffers} from './mocks/favorite-offers';
import {CITIES} from './components/cities-list/const';
import {store} from './store/index';
import ErrorMessage from './components/error-message/error-message';

import {fetchOffersAction, checkAuthAction} from './store/api-actions';
store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App
        favoriteOffers = {favoriteOffers}
        cities = {CITIES}
      />
    </Provider>
  </React.StrictMode>
);
