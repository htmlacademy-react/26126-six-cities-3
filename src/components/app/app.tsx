import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from '../../pages/main/main';
import {AppRoute} from './const';
import Favorite from '../../pages/favorite/favorite';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import LoginPrivateRoute from '../login-private-route/login-private-route';
import NotFound from '../not-found/not-found';

import Loading from '../../components/loading/loading';
import {useAppSelector} from '../../hooks/index';


import {getAuthorizationStatus, getAuthCheckedStatus} from '../../store/user-authorization/selectors';

import {getOffersLoadingStatus} from '../../store/offers-load/selectors';


function App() : JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked || isOffersLoading) {
    return (
      <Loading />
    );
  }
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={'/'}
          element={
            <MainPage/>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <LoginPrivateRoute status={authorizationStatus}>
              <Login/>
            </LoginPrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              status={authorizationStatus}
            >
              <Favorite/>
            </PrivateRoute>
          }
        />
        <Route
          path={`/${AppRoute.Offer}/:id`}
          element={<Offer/>}
        />
        <Route
          path='*'
          element={<NotFound/>}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
