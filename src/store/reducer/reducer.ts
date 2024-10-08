import {createReducer} from '@reduxjs/toolkit';

import {OfferType, OfferPage} from '../../types/offer-type';
import {Review} from '../../types/review-type';
import {loadOffers, loadOffer, sortOffers, hoverOffer, checkAuthorization, setError, setOffersLoadingStatus, setEmail, loadReviews, loadAroundOffers, setCity, setComment, setRating} from '../action';

import {AuthorizationStatus} from '../../store/const';
import {INITIAL_CITY} from '../../common';

const INITIAL_SORT = 'Popular';

type InitalState = {
  sort: string;
  offers: OfferType[];
  aroundOffers: OfferType[];
  activeOfferId: string;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersLoading: boolean;
  user: string;
  offer: OfferPage | undefined;
  reviews: Review[];
  city: string;
  comment: string;
  rating: number;
}

const initialState:InitalState = {
  offers: [],
  sort: INITIAL_SORT,
  activeOfferId: '',
  authorizationStatus: AuthorizationStatus.NoAuth,
  error: null,
  isOffersLoading: false,
  user:'',
  offer: undefined,
  reviews: [],
  aroundOffers: [],
  city: INITIAL_CITY,
  comment: '',
  rating: 0
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(sortOffers, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(hoverOffer, (state, action) => {
      state.activeOfferId = action.payload;
    })
    .addCase(checkAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setEmail, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadAroundOffers, (state, action) => {
      state.aroundOffers = action.payload;
    })
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setComment, (state, action) => {
      state.comment = action.payload;
    })
    .addCase(setRating, (state, action) => {
      state.rating = action.payload;
    });
});

export {reducer};
