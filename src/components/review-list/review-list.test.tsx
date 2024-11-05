import {render, screen} from '@testing-library/react';

import {makeFakeReview} from '../../utils/moсks';
import {withHistory, withStore} from '../../utils/mock-component';
import ReviewList from './review-list';

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const fakeReviews = [makeFakeReview()];
    const reviewTestId = 'review-item';
    const { withStoreComponent } = withStore(<ReviewList reviews={fakeReviews}/>, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const reviews = screen.getAllByTestId(reviewTestId);

    expect(reviews.length).toBe(fakeReviews.length);
  });
});
