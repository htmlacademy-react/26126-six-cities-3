import {createAction} from '@reduxjs/toolkit';
import {OfferType, OfferPage} from '../types/offer-type';
import {Review, NewComment} from '../types/review-type';
import {AuthorizationStatus} from '../store/const';
import {AppRoute} from '../components/app/const';

export const Action = {
  LOAD_OFFERS: 'offers/LOAD_OFFERS',
  LOAD_OFFER: 'offer/LOAD_OFFER',
  LOAD_AROUND_OFFERS: 'aroundOffer/LOAD_AROUND_OFFERS',
  LOAD_REVIEWS: 'reviews/LOAD_REVIEWS',
  SORT: 'offers/SORT',
  ACTIVE_OFFER: 'offers/ACTIVE_OFFER',
  CHECK_AUTHORIZATION: 'user/CHECK_AUTHORIZATION',
  SET_ERROR:'offers/SET_ERROR',
  SET_OFFERS_LOADING_STATUS:'data/setOffersLoadingStatus',
  REDIRECT:'login/redirectToRoute',
  LOGIN: 'user/login',
  SET_CITY: 'offers/city',
  SET_REVIEW: 'offer/review',
  SET_RATING: 'offer/rating'
};

export const loadOffers = createAction<OfferType[]>(Action.LOAD_OFFERS);
export const loadOffer = createAction<OfferPage|undefined>(Action.LOAD_OFFER);
export const loadReviews = createAction<Review[]>(Action.LOAD_REVIEWS);
export const loadAroundOffers = createAction<OfferType[]>(Action.LOAD_AROUND_OFFERS);

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

export const setEmail = createAction(Action.LOGIN, (value:string)=>({
  payload:value
}));

export const setCity = createAction(Action.SET_CITY, (value:string)=>({
  payload:value
}));

export const setComment = createAction(Action.SET_REVIEW, (value:string)=>({
  payload:value
}));

export const setRating = createAction(Action.SET_RATING, (value:number)=>({
  payload:value
}));
