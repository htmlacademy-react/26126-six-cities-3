import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {sortOffers, hoverOffer, setCity, setError} from '../action';
import {AppActions} from '../../types/state';
import {INITIAL_CITY} from '../../common';

const INITIAL_SORT = 'Popular';

const initialState: AppActions = {
  sort: INITIAL_SORT,
  activeOfferId: '',
  error: null,
  city: INITIAL_CITY,
};

export const appActions = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sortOffers, (state, action) => {
        state.sort = action.payload;
      })
      .addCase(hoverOffer, (state, action) => {
        state.activeOfferId = action.payload;
      })
      .addCase(setCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
});
