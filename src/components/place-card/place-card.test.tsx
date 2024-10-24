import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-component';
import PlaceCard from './place-card';
import {makeFakeOfferCard, makeFakeStore} from '../../utils/moks';
import {AuthorizationStatus} from '../../store/const';


describe('Component: PlaceCard', () => {
  it('should render correct', () => {
    const fakeOffer = makeFakeOfferCard();
    const placeCardValueTestId = 'placeCard';

    const withHistoryComponent = withHistory(<PlaceCard offer={fakeOffer}/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDasabled: false,
      email: ''
    } }));

    const preparedComponent = withStoreComponent;
    render(preparedComponent);

    const placeCardValues = screen.getAllByTestId(placeCardValueTestId);

    expect(placeCardValues).toBeDefined();
  });
});
