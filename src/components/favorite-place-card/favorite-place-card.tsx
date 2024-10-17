import {Link} from 'react-router-dom';

import {OfferType} from '../../types/offer-type';


import {postFavoriteAction, fetchOffersAction} from '../../store/api-actions';
import {refreshFavoriteCards} from '../../store/offers-load/offers-load';
import {useAppDispatch, useAppSelector} from '../../hooks/index';

import {getAuthorizationStatus} from '../../store/user-authorization/selectors';
import {AuthorizationStatus} from '../../store/const';
import {AppRoute} from '../app/const';
import {redirectToRoute} from '../../store/action';

type PropPlaceCard = {
  offer: OfferType;
}

function FavoritePlaceCard(props: PropPlaceCard): JSX.Element{
  const {offer} = props;
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkButtonClick = () => {
    if(authStatus !== AuthorizationStatus.Auth){
      dispatch(redirectToRoute(AppRoute.Login));
    }
    dispatch(postFavoriteAction({
      offerId: offer.id,
      favoriteStatus: !offer.isFavorite ? 1 : 0
    })).unwrap().then(()=>{
      dispatch(refreshFavoriteCards(offer));
      dispatch(fetchOffersAction(true));
    });
  };
  return(
    <article key={offer.id}
      className="favorites__card place-card"
    >
      {offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ''}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={150}
            height={110}
            alt={offer.type}
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">
                            /&nbsp;night
            </span>
          </div>
          <button
            onClick={handleBookmarkButtonClick}
            className={offer.isFavorite ?
              'place-card__bookmark-button button place-card__bookmark-button--active' : 'place-card__bookmark-button button'}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '100%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="#"> {offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>

  );
}

export default FavoritePlaceCard;
