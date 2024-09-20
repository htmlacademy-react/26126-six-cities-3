import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app/app';

import {offers} from './mocks/offers';
import {favoriteOffers} from './mocks/favorite-offers';
import {reviews} from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      cardsCount = {offers.length}
      offers = {offers}
      favoriteOffers = {favoriteOffers}
      reviews = {reviews}
    />
  </React.StrictMode>
);
