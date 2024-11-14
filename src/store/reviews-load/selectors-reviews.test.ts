import {NameSpace} from '../const';
import {getSortedReviews, getDisabledReviewStatus} from './selectors';
import {makeFakeReview} from '../../utils/moсks';

describe('ReviewsData selectors', () => {
  const state = {
    [NameSpace.ReviewsData]: {
      reviews: [makeFakeReview()],
      isReviewFormDasabled: false,
    }
  };
  it('should return reviews', () => {
    const {reviews} = state[NameSpace.ReviewsData];
    const result = getSortedReviews(state);
    expect(result).toBe(reviews);
  });

  it('should return isReviewFormDasabled status', () => {
    const {isReviewFormDasabled} = state[NameSpace.ReviewsData];
    const result = getDisabledReviewStatus(state);
    expect(result).toBe(isReviewFormDasabled);
  });
});
