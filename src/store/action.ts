import {createAction} from '@reduxjs/toolkit';
import {OfferType} from '../types/offer-type';

const Action = {
  LOAD_OFFERS: 'offers/LOAD_OFFERS',
  SORT: 'offers/SORT',
  ACTIVE_OFFER: 'offers/ACTIVE_OFFER'
};

export const loadOffers = createAction<{offers:OfferType}>(Action.LOAD_OFFERS);

export const sortOffers = createAction(Action.SORT, (value:string)=>({
  payload:value
}));

export const hoverOffer = createAction(Action.ACTIVE_OFFER, (value:string)=>({
  payload:value
}));
