import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from '../src/components/app/app';

import {favoriteOffers} from './mocks/favorite-offers';
import {reviews} from './mocks/reviews';
import {CITIES} from './components/cities-list/const';
import {store} from './store/index';

import {fetchOffersAction} from './store/api-actions';
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        favoriteOffers = {favoriteOffers}
        reviews = {reviews}
        cities = {CITIES}
      />
    </Provider>
  </React.StrictMode>
);
