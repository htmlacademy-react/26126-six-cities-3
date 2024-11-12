import { AuthorizationStatus, NameSpace } from '../const';
import {UserAuth} from '../../types/state';
import {getAuthCheckedStatus, getAuthorizationStatus, getDisabledStatus, getUser} from './selectors';
import {makeFakeUser} from '../../utils/moсks';


describe('UserProcess selectors', () => {
  it('should return authorization status from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserAuth = {
      authorizationStatus,
      user: null,
      isLoginFormDasabled: false,
    };
    const result = getAuthorizationStatus({ [NameSpace.User]: state });
    expect(result).toBe(authorizationStatus);
  });
  it('should return "true" because auth status is "Auth"', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserAuth = {
      authorizationStatus,
      user: null,
      isLoginFormDasabled: false,
    };
    const result = getAuthCheckedStatus({ [NameSpace.User]: state });
    expect(result).toBe(true);
  });
  it('should return "false" because auth status is "Unknown"', () => {
    const authorizationStatus = AuthorizationStatus.Unknown;
    const state: UserAuth = {
      authorizationStatus,
      user: null,
      isLoginFormDasabled: false,
    };
    const result = getAuthCheckedStatus({ [NameSpace.User]: state });
    expect(result).toBe(false);
  });
  it('should return isLoginFormDasabled status', () => {
    const authorizationStatus = AuthorizationStatus.NoAuth;
    const state: UserAuth = {
      authorizationStatus,
      user: null,
      isLoginFormDasabled: false,
    };
    const {isLoginFormDasabled} = state;
    const result = getDisabledStatus({ [NameSpace.User]: state });
    expect(result).toBe(isLoginFormDasabled);
  });

  it('should return user', () => {
    const authorizationStatus = AuthorizationStatus.NoAuth;
    const state: UserAuth = {
      authorizationStatus,
      user: makeFakeUser(),
      isLoginFormDasabled: false,
    };
    const {user} = state;
    const result = getUser({ [NameSpace.User]: state });
    expect(result).toBe(user);
  });
});
