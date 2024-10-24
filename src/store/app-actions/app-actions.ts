import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {AppActions} from '../../types/state';
export const INITIAL_SORT = 'Popular';

const initialState: AppActions = {
  sort: INITIAL_SORT,
  activeOfferId: '',
  error: null,
};

export const appActions = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    sortOffers: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    hoverOffer: (state, action: PayloadAction<string>) => {
      state.activeOfferId = action.payload;
    },
  },
});

export const {sortOffers, hoverOffer} = appActions.actions;
