import {NameSpace} from '../../store/const';
import {State} from '../../types/state';
import {OfferType, OfferPage} from '../../types/offer-type';

export const getAroundOffers = (state: State): OfferType[] => state[NameSpace.OffersData].aroundOffers;

export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.OffersData].isOffersLoading;

export const getOfferPageLoadingStatus = (state: State): boolean => state[NameSpace.OffersData].isOfferLoading;

export const getFavoriteLoadingStatus = (state: State): boolean => state[NameSpace.OffersData].isFavoriteLoading;

export const getDataOffer = (state: State): OfferPage|undefined => state[NameSpace.OffersData].offer;

export const getDataCard = (state: State): OfferType|undefined => state[NameSpace.OffersData].offerCard;

export const getOffers = (state: State): OfferType[]=> state[NameSpace.OffersData].offers;

export const getFavoriteOffers = (state: State): OfferType[] => state[NameSpace.OffersData].favoriteOffers;
