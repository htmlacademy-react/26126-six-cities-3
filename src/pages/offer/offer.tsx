import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {AuthorizationStatus} from '../../store/const';
import {AppRoute} from '../../components/app/const';

import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import CardsList from '../../components/cards-list/cards-list';
import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';
import Loading from '../../components/loading/loading';

import {getStarsStyle} from '../../common';
import {loadOffer} from '../../store/offers-load/offers-load';
import {fetchOfferPageAction, fetchReviewsAction, fetchAroundOffersAction, postFavoriteAction, fetchOffersAction} from '../../store/api-actions';
import {redirectToRoute} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks/index';

import {getAroundOffers, getDataOffer} from '../../store/offers-load/selectors';
import {getSortedReviews} from '../../store/reviews-load/selectors';
import {getAuthorizationStatus} from '../../store/user-authorization/selectors';
import {getOfferPageLoadingStatus} from '../../store/offers-load/selectors';

const OFFERS_AROUND_LENGTH = 3;
const IMAGES_COUNT = 6;
const REVIEWS_COUNT_IN_PAGE = 10;

function Offer(): JSX.Element|undefined {
  const offer = useAppSelector(getDataOffer);
  const reviews = useAppSelector(getSortedReviews);
  const aroundOffers = useAppSelector(getAroundOffers);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isOfferLoading = useAppSelector(getOfferPageLoadingStatus);

  const params = useParams();
  const activeOfferId = params.id;

  const firstAroundOffers = aroundOffers.slice(0,OFFERS_AROUND_LENGTH);

  const dispatch = useAppDispatch();

enum PlaceTypes {
  apartment = 'Apartment',
  room = 'Room',
  house = 'House',
  hotel= 'Hotel'
  }

const getPlaceType = (type:string)=>PlaceTypes[type as keyof typeof PlaceTypes];

const handleBookmarkButtonClick = () => {
  if(authStatus !== AuthorizationStatus.Auth){
    dispatch(redirectToRoute(AppRoute.Login));
  } else {
    if(offer){
      dispatch(postFavoriteAction({
        offerId: offer.id,
        favoriteStatus:!offer.isFavorite ? 1 : 0
      })).unwrap().then(()=>{
        dispatch(fetchOffersAction(true));
        dispatch(loadOffer(!offer.isFavorite));
      });
    }
  }
};

useEffect(() => {
  if(activeOfferId){
    dispatch(fetchOfferPageAction(activeOfferId));
    dispatch(fetchReviewsAction(activeOfferId));
    dispatch(fetchAroundOffersAction(activeOfferId));
  }
}, [activeOfferId, authStatus]);

if(offer){
  if (isOfferLoading) {
    return (
      <Loading />
    );
  }
  return (
    <div className="page" data-testid="offer-page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                offer.images.slice(0,IMAGES_COUNT).map((srcImg)=>(
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
                <button data-testid="bookmark-button" onClick={handleBookmarkButtonClick} className={offer.isFavorite ? 'offer__bookmark-button button offer__bookmark-button--active' : 'offer__bookmark-button button'} type="button">
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
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{getPlaceType(offer.type)}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} {offer.maxAdults > 1 ? 'adults' : 'adult'}
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
                  <div className={offer.host.isPro ? 'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper' : 'offer__avatar-wrapper user__avatar-wrapper'}>
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro ? <span className="offer__user-status">Pro</span> : ''}
                </div>
                <div className="offer__description">
                  {offer.description}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewList reviews={reviews.slice(0,REVIEWS_COUNT_IN_PAGE)}/>
                {authStatus === AuthorizationStatus.Auth ?
                  <ReviewForm/> : ''}
              </section>
            </div>
          </div>
          <section className="offer__map map" >
            <Map offers={firstAroundOffers}
              selectedOffer={offer}
              mapWidth = {'1145px'}
              mapHeight = {'579px'}
              mapMargin ={'auto'}
              isOfferPageMap
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <CardsList offers={firstAroundOffers} isNearList/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
}

export default Offer;
