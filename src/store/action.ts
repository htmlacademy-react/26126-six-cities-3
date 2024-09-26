import {createAction} from '@reduxjs/toolkit';
import {OfferType} from '../types/offer-type';

const Action = {
  SELECT_CITY:'SELECT_CITY',
  LOAD_OFFERS: 'LOAD_OFFERS'
};

export const selectCity = createAction(Action.SELECT_CITY, (value:string)=>({
  payload:value
}));

export const loadOffers = createAction<{offers:OfferType}>(Action.LOAD_OFFERS);
