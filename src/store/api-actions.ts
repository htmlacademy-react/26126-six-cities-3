import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, State} from '../types/state.js';
import {OfferType, OfferPage} from '../types/offer-type.js';
import {Review, NewComment} from '../types/review-type';

import {AuthData} from '../types/auth-type.js';
import {UserData} from '../types/user-data-type.js';

import {setError, redirectToRoute} from './action.js';

import {saveToken, dropToken} from '../services/token';
import {APIRoute,TIMEOUT_SHOW_ERROR} from './const';
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

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offers',
  async (_arg, {extra: api}) => {
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
  async ({pageId, comment, rating, formRef}, {dispatch, extra: api}) => {

    await api.post<NewComment>(`${APIRoute.Comments}/${pageId}`, {comment, rating});
    if(formRef) {
      formRef.reset();
    }
    dispatch(fetchReviewsAction(pageId));
  },
);


export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<string>(APIRoute.Login);
    return data;
  },
);
export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
    return email;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
