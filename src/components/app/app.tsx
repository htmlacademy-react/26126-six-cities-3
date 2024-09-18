import MainPage from '../main/main';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from './const';
import {AuthorizationStatus} from '../private-route/const';
import Favorite from '../favorite/favorite';
import Login from '../login/login';
import Offer from '../offer/offer';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../not-found/not-found';


type AppProps = {
  cardsCount: number;
}

function App({cardsCount}:AppProps) : JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage cardsCount={cardsCount}/>}
        />
        <Route
          path={AppRoute.Login}
          element={ <Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              status={AuthorizationStatus.NoAuth}
            >
              <Favorite/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={ <Offer/>}
        />
        <Route
          path='*'
          element={<NotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
