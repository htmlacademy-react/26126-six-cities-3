import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, State, User} from '../types/state.js';
import {OfferType, OfferPage, FavoriteOffer} from '../types/offer-type.js';
import {Review, NewComment} from '../types/review-type';

import {AuthData} from '../types/auth-type.js';

import {redirectToRoute} from './action.js';
import {loading} from '../store/offers-load/offers-load.js';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from './const';
import {AppRoute} from '../components/app/const';

export const fetchOffersAction = createAsyncThunk<OfferType[], boolean, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offers',
  async (isFavoriteChange, {dispatch, extra: api}) => {
    dispatch(loading(isFavoriteChange));
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchAroundOffersAction = createAsyncThunk<OfferType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/AroundOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchOfferPageAction = createAsyncThunk<OfferPage | undefined, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offer',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<OfferPage>(`${APIRoute.Offers}/${id}`);
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<OfferType[], undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/favorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoute.Favorite);
    return data;
  },
);

export const postFavoriteAction = createAsyncThunk<void, FavoriteOffer,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/favoriteStatus',
  async ({offerId, favoriteStatus}, {dispatch, extra: api}) => {
    await api.post<OfferType>(`${APIRoute.Favorite}/${offerId}/${favoriteStatus}`);
    dispatch(fetchFavoriteOffersAction());
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/reviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<void, NewComment,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/review',
  async ({pageId, comment, rating}, {dispatch, extra: api}) => {
    await api.post<NewComment>(`${APIRoute.Comments}/${pageId}`, {comment, rating});
    dispatch(fetchReviewsAction(pageId));
  },
);

export const checkAuthAction = createAsyncThunk<User, undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>(APIRoute.Login);
    return data;
  },
);
export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(fetchOffersAction(true));
  },
);
