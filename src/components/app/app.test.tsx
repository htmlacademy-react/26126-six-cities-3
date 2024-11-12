import {render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import {AuthorizationStatus} from '../../store/const';
import {AppRoute} from './const';
import App from './app';
import {withHistory, withStore} from '../../utils/mock-component';
import {makeFakeStore, makeFakeOfferPage} from '../../utils/moсks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);
    render(withStoreComponent);

    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo'));
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });


  it('should render "Login" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);

    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
    expect(screen.getByAltText('6 cities logo'));
  });
  it('should render "Favorite" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDasabled: false,
    } }));

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getAllByAltText('6 cities logo'));
    expect(screen.getByText('Sign out'));
    expect(screen.getByText('Nothing yet saved.'));
  });
  it('should render "Offer" when user navigate to "/offers/{offerId}"', () => {
    const fakeOfferPage = makeFakeOfferPage();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDasabled: false,
    }, DATA_OFFERS: {
      offers: [],
      isOffersLoading: false,
      offerCard: undefined,
      offer: fakeOfferPage,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false,
    }}));
    mockHistory.push(`${AppRoute.Offer}/${fakeOfferPage.id}`);
    render(withStoreComponent);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

  });
  it('should render "NotFound" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);
    render(withStoreComponent);
    expect(screen.getByText('404 not Found')).toBeInTheDocument();
    expect(screen.getByText('На главную')).toBeInTheDocument();
  });
});
