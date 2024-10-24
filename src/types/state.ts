import {store} from '../store/index';
import {AuthorizationStatus} from '../store/const.js';
import {OfferType, OfferPage} from '../types/offer-type.js';
import {Review} from '../types/review-type.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type User = {
    avatarUrl: string;
    email: string;
    isPro: boolean;
    name: string;
    token: string;
};

export type UserAuth = {
  authorizationStatus: AuthorizationStatus;
  user: User| null;
  isLoginFormDasabled: boolean;
  email: string;
};

export type OffersLoad = {
  offers: OfferType[];
  isOffersLoading: boolean;
  offerCard: OfferType | undefined;
  offer: OfferPage | undefined;
  aroundOffers: OfferType[];
  favoriteOffers: OfferType[];
  isOfferLoading: boolean;
  isFavoriteLoading: boolean;
  favoriteStatus: boolean;
}

export type ReviewsLoad = {
  reviews: Review[];
  isReviewFormDasabled: boolean;
}

export type AppActions = {
  sort: string;
  activeOfferId: string;
  error: string | null;
}
