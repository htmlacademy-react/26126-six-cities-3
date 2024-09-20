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

import {Offers} from '../../types/offer-type';
import {Reviews} from '../../types/review-type';


type AppProps = {
  cardsCount: number;
  offers: Offers;
  favoriteOffers: Offers;
  reviews: Reviews;
}

function App({cardsCount, offers, favoriteOffers, reviews}:AppProps) : JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage cardsCount={cardsCount} offers={offers}/>}
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
            path={`${AppRoute.Offer}/:id`}
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
