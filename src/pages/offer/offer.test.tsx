import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory, withStore} from '../../utils/mock-component';
import Offer from './offer';
import {makeFakeStore, makeFakeOfferPage, makeFakeOfferCard} from '../../utils/moks';
import {APIRoute} from '../../store/const';
import { extractActionsTypes } from '../../utils/moks';
import {AuthorizationStatus} from '../../store/const';

import ReviewList from '../../components/review-list/review-list';
import ReviewForm from '../../components/review-form/review-form';
//import {postFavoriteAction/*, fetchFavoriteOffersAction*/} from '../../store/api-actions';
//import {loadOffer} from '../../store/offers-load/offers-load';
//import {redirectToRoute} from '../../store/action';

describe('Component: Offer', () => {
  it('should render correct with Auth', () => {
    vi.mock('../../components/review-list/review-list');
    vi.mock('../../components/review-form/review-form');
    const fakeOffer = makeFakeOfferPage();
    const fakeOfferCard = makeFakeOfferCard();
    const placeCardId = 'placeCard';

    const { withStoreComponent } = withStore(<Offer/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDasabled: false,
      email: ''
    },
    DATA_OFFERS: {
      offers: [],
      isOffersLoading: false,
      offerCard: undefined,
      offer: fakeOffer,
      aroundOffers: [fakeOfferCard],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false,
    } }));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getAllByAltText(`Photo ${fakeOffer.type}`).length).toBe(fakeOffer.images.length);
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.host.name)).toBeInTheDocument();
    expect(ReviewList).toBeCalled();
    expect(ReviewForm).toBeCalled();
    expect(screen.getByText('Other places in the neighbourhood'));
    expect(screen.getAllByTestId(placeCardId).length).toBe([fakeOfferCard].length);

  });

  it('should render correct with NoAuth', () => {
    vi.mock('../../components/review-list/review-list');
    vi.mock('../../components/review-form/review-form');
    const fakeOffer = makeFakeOfferPage();
    const fakeOfferCard = makeFakeOfferCard();
    const placeCardId = 'placeCard';

    const { withStoreComponent } = withStore(<Offer/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDasabled: false,
      email: ''
    },
    DATA_OFFERS: {
      offers: [],
      isOffersLoading: false,
      offerCard: undefined,
      offer: fakeOffer,
      aroundOffers: [fakeOfferCard],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false,
    } }));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);


    /*if(fakeOffer.isPremium){
      expect(screen.getByText('Premium')).toBeInTheDocument();
    }*/
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getAllByAltText(`Photo ${fakeOffer.type}`).length).toBe(fakeOffer.images.length);
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i));
    expect(screen.getByText(fakeOffer.host.name));
    expect(screen.getByText('Other places in the neighbourhood'));
    expect(screen.getAllByTestId(placeCardId).length).toBe([fakeOfferCard].length);

    expect(ReviewList).toBeCalled();
    expect(ReviewForm).not.toBeCalled();
  });

  it('should dispatch postFavoriteAction', async () => {
    const fakeOffer = makeFakeOfferPage();
    const bookmarkButtonId = 'bookmark-button';

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<Offer/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDasabled: false,
      email: ''
    },
    DATA_OFFERS: {
      offers: [],
      isOffersLoading: false,
      offerCard: undefined,
      offer: fakeOffer,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false,
    } }));
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${fakeOffer.id}/${fakeOffer.isFavorite ? 1 : 0}`).reply(200, []);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByTestId(bookmarkButtonId));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      //postFavoriteAction.pending.type,
      //postFavoriteAction.rejected.type,
      //fetchFavoriteOffersAction.pending.type
    ]);
  });
});
