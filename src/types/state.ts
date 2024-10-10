import {store} from '../store/index.js';
import {AuthorizationStatus} from '../store/const.js';
import {OfferType, OfferPage} from '../types/offer-type.js';
import {Review} from '../types/review-type.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export type UserAuth = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};

export type OffersLoad = {
  offers: OfferType[];
  isOffersLoading: boolean;
  offer: OfferPage | undefined;
  aroundOffers: OfferType[];
}

export type ReviewsLoad = {
  reviews: Review[];
}

export type AppActions = {
  sort: string;
  activeOfferId: string;
  error: string | null;
  city: string;
}
