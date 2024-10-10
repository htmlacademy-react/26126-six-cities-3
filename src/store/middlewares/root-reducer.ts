import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {appActions} from '../app-actions/app-actions';
import {offersLoad} from '../offers-load/offers-load';
import {reviewsLoad} from '../reviews-load/reviews-load';
import {userAuthorization} from '../user-authorization/user-authorization';

export const rootReducer = combineReducers({
  [NameSpace.AppActions]: appActions.reducer,
  [NameSpace.OffersData]: offersLoad.reducer,
  [NameSpace.User]: userAuthorization.reducer,
  [NameSpace.ReviewsData]: reviewsLoad.reducer,
});
