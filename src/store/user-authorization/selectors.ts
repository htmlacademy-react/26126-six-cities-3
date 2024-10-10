import {NameSpace, AuthorizationStatus} from '../../store/const';
import {State} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getEmail = (state: State): string => state[NameSpace.User].email;

export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.NoAuth;
