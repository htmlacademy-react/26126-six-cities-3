import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {AuthorizationStatus} from '../../store/const';

import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import CardsList from '../../components/cards-list/cards-list';
import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';

import {getStarsStyle} from '../../common';
import {loadOffer} from '../../store/action';
import {fetchOfferPageAction, fetchReviewsAction, fetchAroundOffersAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks/index';

import {getAroundOffers,getDataOffer, getOffers} from '../../store/offers-load/selectors';

import {getCity} from '../../store/app-actions/selectors';
import {getReviews} from '../../store/reviews-load/selectors';
import {getAuthorizationStatus} from '../../store/user-authorization/selectors';

function Offer(): JSX.Element|undefined {
  const offers = useAppSelector(getOffers);
  const actualCity = useAppSelector(getCity);
  const offer = useAppSelector(getDataOffer);
  const reviews = useAppSelector(getReviews);
  const aroundOffers = useAppSelector(getAroundOffers);
  const authStatus = useAppSelector(getAuthorizationStatus);

  const params = useParams();
  const activeOfferId = params.id;
  const selectedOffer = offers.find((item) => item.id === activeOfferId);

  const firstAroundOffers = aroundOffers.slice(0,3);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(activeOfferId && offer === undefined){
      dispatch(loadOffer(undefined));
      dispatch(fetchOfferPageAction(activeOfferId));
      dispatch(fetchReviewsAction(activeOfferId));
      dispatch(fetchAroundOffersAction(activeOfferId));
    }
  }, [activeOfferId, dispatch, offer]);

  if(offer){
    return (
      <div className="page">
        <Helmet>
          <title>6 cities: offer</title>
        </Helmet>
        <Header/>
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {
                  offer.images.map((srcImg)=>(
                    <div key={srcImg} className="offer__image-wrapper">
                      <img
                        className="offer__image"
                        src={srcImg}
                        alt={`Photo ${offer.type}`}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium ?
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div> :
                  ''}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button className={offer.isFavorite ? 'offer__bookmark-button button offer__bookmark-button--active' : 'offer__bookmark-button button'} type="button">
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width:getStarsStyle(offer.rating) }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">4.8</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{offer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} {offer.bedrooms > 0 ? 'Bedrooms' : 'Bedroom'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} {offer.maxAdults > 0 ? 'adults' : 'adult'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&#39;s inside </h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good)=>(
                      <li key={good} className="offer__inside-item">{good}</li>))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    <span className="offer__user-status">{offer.host.isPro ? 'Pro' : ''}</span>
                  </div>
                  <div className="offer__description">
                    {offer.description}
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  <ReviewList reviews={reviews}/>
                  {authStatus === AuthorizationStatus.Auth ?
                    <ReviewForm/> : ''}
                </section>
              </div>
            </div>
            <section className="offer__map map" >
              <Map offers={firstAroundOffers}
                selectedOffer={selectedOffer}
                mapWidth = {'1145px'}
                mapHeight = {'579px'}
                mapMargin ={'auto'}
                actualCity= {actualCity}
                offerPageMap
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
              Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                <CardsList offers={aroundOffers}/>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default Offer;
