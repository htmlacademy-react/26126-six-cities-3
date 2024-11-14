import {Link} from 'react-router-dom';

import {AppRoute} from '../app/const';
import {OfferType} from '../../types/offer-type';
import {getStarsStyle} from '../../common';
import {postFavoriteAction} from '../../store/api-actions';
import {refreshCards} from '../../store/offers-load/offers-load';
import {useAppDispatch, useAppSelector} from '../../hooks/index';


import {getAuthorizationStatus} from '../../store/user-authorization/selectors';
import {AuthorizationStatus} from '../../store/const';
import {redirectToRoute} from '../../store/action';

import {hoverOffer} from '../../store/app-actions/app-actions';

type PropPlaceCard = {
  offer: OfferType;
  isNearCard: boolean;
}


function PlaceCard(props: PropPlaceCard): JSX.Element {
  const dispatch = useAppDispatch();
  const {offer, isNearCard} = props;
  const {id, title, type, price, isPremium, isFavorite, rating, previewImage} = offer;

  const authStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkButtonClick = () => {
    if(authStatus !== AuthorizationStatus.Auth){
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      if(offer){
        dispatch(postFavoriteAction({
          offerId: offer.id,
          favoriteStatus: !offer.isFavorite ? 1 : 0
        }));
        dispatch(refreshCards(offer));
      }
    }
  };

  function handleMouseOver() {
    dispatch(hoverOffer(offer.id));
  }
  function handleMouseOut() {
    dispatch(hoverOffer(''));
  }

  return (
    <article
      data-testid ="placeCard"
      className={isNearCard ? 'near-places__card place-card' : 'cities__card place-card'}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : null}

      <div className={isNearCard ? 'near-places__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper'}>
        <Link data-testid ="placeCard-link" to={`${AppRoute.Offer}/${id}`} >
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">
          /&nbsp;night
            </span>
          </div>
          <button
            onClick={handleBookmarkButtonClick}
            className= {isFavorite ?
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
            <span className="visually-hidden" data-testid="bookmark">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width:getStarsStyle(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}


export default PlaceCard;
