import {createAction} from '@reduxjs/toolkit';
import {OfferType} from '../types/offer-type';
import {AuthorizationStatus} from '../store/const';
import {AppRoute} from '../components/app/const';

export const Action = {
  LOAD_OFFERS: 'offers/LOAD_OFFERS',
  SORT: 'offers/SORT',
  ACTIVE_OFFER: 'offers/ACTIVE_OFFER',
  CHECK_AUTHORIZATION: 'user/CHECK_AUTHORIZATION',
  SET_ERROR:'offers/SET_ERROR',
  SET_OFFERS_LOADING_STATUS:'data/setOffersLoadingStatus',
  REDIRECT:'login/redirectToRoute',
  LOGIN: 'user/login'
};

export const loadOffers = createAction<OfferType[]>(Action.LOAD_OFFERS);

export const sortOffers = createAction(Action.SORT, (value:string)=>({
  payload:value
}));

export const hoverOffer = createAction(Action.ACTIVE_OFFER, (value:string)=>({
  payload:value
}));

export const checkAuthorization = createAction<AuthorizationStatus>(Action.CHECK_AUTHORIZATION);
export const setError = createAction<string | null>(Action.SET_ERROR);
export const setOffersLoadingStatus = createAction<boolean>(Action.SET_OFFERS_LOADING_STATUS);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT);
export const login = createAction(Action.LOGIN, (value:string)=>({
  payload:value
}));
