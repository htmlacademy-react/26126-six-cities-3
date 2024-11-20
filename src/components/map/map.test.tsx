import {render, screen} from '@testing-library/react';

import Map from '../../components/map/map';
import {makeFakeOfferCard} from '../../utils/mocks';
describe('Component: Map', () => {
  it('should render correct isOfferPageMap = false', () => {
    const fakeOffer = makeFakeOfferCard();
    const fakeOffers = [makeFakeOfferCard()];
    const mapContainerId = 'map-id';

    render(
      <Map
        offers={fakeOffers}
        selectedOffer={fakeOffer}
        mapWidth= {'auto'}
        mapHeight = {'100%'}
        mapMargin = {'auto'}
        actualCity = {'Paris'}
        isOfferPageMap={false}
      />);

    const mapContainer = screen.getByTestId(mapContainerId);
    const pinImage = screen.getByAltText('pin-image');
    const pinImages = screen.getAllByAltText('pin-image');

    expect(mapContainer).toBeInTheDocument();
    expect(pinImage).toBeInTheDocument();
    expect(pinImages.length).toBe(fakeOffers.length);
  });
});
