import {NameSpace} from '../../store/const';
import {State} from '../../types/state';
import {OfferType, OfferPage} from '../../types/offer-type';

export const getAroundOffers = (state: Pick<State, NameSpace.OffersData>): OfferType[] => state[NameSpace.OffersData].aroundOffers;

export const getOffersLoadingStatus = (state: Pick<State, NameSpace.OffersData>): boolean => state[NameSpace.OffersData].isOffersLoading;

export const getOfferPageLoadingStatus = (state: Pick<State, NameSpace.OffersData>): boolean => state[NameSpace.OffersData].isOfferLoading;

export const getFavoriteLoadingStatus = (state: Pick<State, NameSpace.OffersData>): boolean => state[NameSpace.OffersData].isFavoriteLoading;

export const getDataOffer = (state: Pick<State, NameSpace.OffersData>): OfferPage|undefined => state[NameSpace.OffersData].offer;

export const getDataCard = (state: Pick<State, NameSpace.OffersData>): OfferType|undefined => state[NameSpace.OffersData].offerCard;

export const getOffers = (state: Pick<State, NameSpace.OffersData>): OfferType[]=> state[NameSpace.OffersData].offers;

export const getFavoriteOffers = (state: Pick<State, NameSpace.OffersData>): OfferType[] => state[NameSpace.OffersData].favoriteOffers;

export const getFavoritesLength = (state: Pick<State, NameSpace.OffersData>): number=> {
  const favoriteOffers = state[NameSpace.OffersData].offers.filter((item)=>item.isFavorite === true
  );
  return favoriteOffers.length;
};
