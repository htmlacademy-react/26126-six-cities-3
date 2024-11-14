import {system, name, internet, datatype, image} from 'faker';
import {User} from '../types/state';
import {OfferType, OfferPage, City} from '../types/offer-type';
import {Review} from '../types/review-type';
import {AuthorizationStatus} from '../store/const';

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State} from '../types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeUser = (): User => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  isPro: false,
  name: name.title(),
  token: system.fileExt(),
} as User);

export const makeFakeOfferCard = ():OfferType =>({
  id: datatype.string(),
  title:  name.title(),
  type: name.title(),
  price: datatype.number(),
  city: {
    name: 'Paris',
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number()
    }
  },
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number()
  },
  isFavorite: false,
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});


export const makeFakeFavoriteOfferCard = ():OfferType =>({
  id: datatype.string(),
  title:  name.title(),
  type: name.title(),
  price: datatype.number(),
  city: {
    name: 'Paris',
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number()
    }
  },
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number()
  },
  isFavorite: true,
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});

export const makeFakeOfferPage = ():OfferPage =>({
  id: datatype.string(),
  city:{
    name: datatype.string(),
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number(),
    }
  },
  title:  name.title(),
  type: name.title(),
  price: datatype.number(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description: name.title(),
  bedrooms: datatype.number(),
  goods: [datatype.string()],
  host: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  },
  images: [image.imageUrl()],
  maxAdults: datatype.number(),
});

export const makeFakeReview = ():Review =>({
  id: datatype.string(),
  date: datatype.string(),
  user: {
    name: datatype.string(),
    avatarUrl: datatype.string(),
    isPro:datatype.boolean()
  },
  comment: datatype.string(),
  rating:  datatype.number(),
});

export const makeFakeCity = (): City =>({
  name: datatype.string(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  }
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
    isLoginFormDasabled: false,
  },
  DATA_OFFERS: {
    offers: [],
    isOffersLoading: false,
    offerCard: undefined,
    offer: undefined,
    aroundOffers: [],
    favoriteOffers: [],
    isOfferLoading: false,
    isFavoriteLoading: false,
    favoriteStatus: false,
  },
  APP_ACTIONS: {
    sort: '',
    activeOfferId: '',
    error: null
  },
  DATA_REVIEWS: {
    reviews: [],
    isReviewFormDasabled: false
  },
  ...initialState ?? {},
});
