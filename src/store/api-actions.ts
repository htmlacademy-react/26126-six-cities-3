import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, State} from '../types/state.js';
import {OfferType, OfferPage} from '../types/offer-type.js';
import {Review, NewComment} from '../types/review-type';
import {Login} from '../types/login-type.js';

import {AuthData} from '../types/auth-type.js';
import {UserData} from '../types/user-data-type.js';

import {loadOffers, loadOffer, checkAuthorization, setError, setOffersLoadingStatus, redirectToRoute, setEmail, loadReviews, loadAroundOffers, setComment, setRating} from './action.js';

import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from './const';
import {AppRoute} from '../components/app/const';


import {store} from './';

export const clearErrorAction = createAsyncThunk(
  'offers/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);

export const fetchAroundOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/AroundOffers',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadAroundOffers(data));
  },
);

export const fetchOfferPageAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offer',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersLoadingStatus(true));
      const {data} = await api.get<OfferPage>(`${APIRoute.Offers}/${id}`);
      dispatch(loadOffer(data));
      dispatch(setOffersLoadingStatus(false));
    } catch {
      dispatch(setOffersLoadingStatus(false));
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/reviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadReviews(data));
  },
);

export const postReviewAction = createAsyncThunk<void, NewComment,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/review',
  async ({pageId, comment, rating, formRef}, {dispatch, extra: api}) => {

    await api.post<NewComment>(`${APIRoute.Comments}/${pageId}`, {comment, rating});
    dispatch(setComment(''));
    dispatch(setRating(0));
    if(formRef) {
      formRef.reset();
    }
    dispatch(fetchReviewsAction(pageId));
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Login>(APIRoute.Login);
      dispatch(checkAuthorization(AuthorizationStatus.Auth));
      dispatch(setEmail(data.email));
    } catch {
      dispatch(checkAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(checkAuthorization(AuthorizationStatus.Auth));
    dispatch(setEmail(email));
    dispatch(redirectToRoute(AppRoute.Main));
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
    dispatch(checkAuthorization(AuthorizationStatus.NoAuth));
  },
);
