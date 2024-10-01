import CardsList from '../../components/cards-list/cards-list';
import Logo from '../../components/logo/logo';
import {Link, useSearchParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppSelector} from '../../hooks/index';
import Map from '../../components/map/map';
import MainEmpty from '../../pages/main-empty/main-empty';

import {getOffersByCity, getSortedOffers} from '../main/common';
import {INITIAL_CITY} from '../../common';

import Sort from '../../components/sort/sort';

type MainProps = {
 cities: string[];
 sortTypes: string[];
}

function MainPage({cities, sortTypes}: MainProps): JSX.Element {

  const [searchParams, ] = useSearchParams();
  const searchCityParams = searchParams.get('city') || INITIAL_CITY;

  const offers = useAppSelector((state)=>state.offers);
  const actualSort = useAppSelector((state) => state.sort);
  const actualCity = searchCityParams;

  const filtredOffersByCity = getOffersByCity(actualCity, offers);
  const cardsCount = filtredOffersByCity.length;

  const filtredOffers = getSortedOffers(getOffersByCity(actualCity, offers),actualSort);

  const activeOffer = useAppSelector((state) => state.activeOffer);
  const selectedOffer = filtredOffers.find((offer) => offer.id === activeOffer);

  if(cardsCount === 0) {
    return <MainEmpty cities={cities}/>;
  } else{
    return(
      <div className="page page--gray page--main">
        <Helmet>
          <title>6 cities</title>
        </Helmet>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo/>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="#">
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList cities={cities}/>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cardsCount} {cardsCount > 1 ? 'places' : 'place'} to stay in {actualCity}</b>
                <Sort sortTypes={sortTypes}/>
                <div className="cities__places-list places__list tabs__content">
                  <CardsList offers={filtredOffers}/>
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map" >
                  <Map offers={filtredOffers} selectedOffer={selectedOffer}
                    mapWidth = {'auto'}
                    mapHeight = {'100%'}
                    mapMargin ={'auto'}
                    actualCity = {actualCity}
                  />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}


export default MainPage;
