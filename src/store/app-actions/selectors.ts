import {NameSpace} from '../../store/const';
import {State} from '../../types/state';

export const getActiveOfferId = (state: State): string => state[NameSpace.AppActions].activeOfferId;


export const getError = (state: State): string|null => state[NameSpace.AppActions].error;

export const getSort = (state: State): string => state[NameSpace.AppActions].sort;
