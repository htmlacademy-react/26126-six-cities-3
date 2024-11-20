import {render, screen} from '@testing-library/react';

import {makeFakeOfferCard, makeFakeStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import {AuthorizationStatus} from '../../store/const';
import CardsList from './cards-list';

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const fakeOffers = [makeFakeOfferCard()];
    const cardValueTestId = 'placeCard';

    const { withStoreComponent } = withStore(<CardsList offers={fakeOffers} isNearList={false}/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
    } }));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const cardsValues = screen.getAllByTestId(cardValueTestId);
    expect(cardsValues.length).toBe(fakeOffers.length);

  });
});
