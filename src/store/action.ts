import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../components/app/const';

export const Action = {
  REDIRECT:'login/redirectToRoute',
};

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT);
