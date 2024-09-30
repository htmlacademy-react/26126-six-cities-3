import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from '../../pages/main/main';
import {AppRoute} from './const';
import {AuthorizationStatus} from '../private-route/const';
import Favorite from '../../pages/favorite/favorite';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../not-found/not-found';

import {OfferType} from '../../types/offer-type';
import {Review} from '../../types/review-type';


type AppProps = {
  favoriteOffers: OfferType[];
  reviews: Review[];
  cities: string[];
  sortTypes: string[];
}

function App({favoriteOffers, reviews, cities, sortTypes}:AppProps) : JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={'/'}
            element={
              <MainPage
                cities={cities}
                sortTypes={sortTypes}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                status={AuthorizationStatus.Auth}
              >
                <Favorite favoriteOffers={favoriteOffers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`/${AppRoute.Offer}/:id`}
            element={<Offer reviews={reviews}/>}
          />
          <Route
            path='*'
            element={<NotFound/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
