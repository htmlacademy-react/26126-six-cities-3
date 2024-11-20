import {makeFakeReview} from '../../utils/mocks';
import {fetchReviewsAction, postReviewAction} from '../api-actions';
import {reviewsLoad} from './reviews-load';

describe('ReviewsLoad Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isReviewFormDisabled: false
    };
    const result = reviewsLoad.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });


  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isReviewFormDisabled: false
    };
    const result = reviewsLoad.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewFormDasabled" to "true" with "postReviewAction.pending"', () => {
    const expectedState = {
      reviews: [],
      isReviewFormDisabled: true
    };
    const result = reviewsLoad.reducer(undefined, postReviewAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewFormDasabled" to "false" with "postReviewAction.fulfilled"', () => {
    const mockComment = {
      pageId: 'string',
      comment: 'string',
      rating: 5,
      formRef:null
    };
    const expectedState = {
      reviews: [],
      isReviewFormDisabled: false
    };

    const result = reviewsLoad.reducer(
      undefined,
      postReviewAction.fulfilled(undefined,'',mockComment)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewFormDasabled" to "false" with "postReviewAction.rejected"', () => {
    const expectedState = {
      reviews: [],
      isReviewFormDisabled: false
    };
    const result = reviewsLoad.reducer(
      undefined,
      postReviewAction.rejected
    );
    expect(result).toEqual(expectedState);
  });


  it('should set should set "reviews" to array with review, "isReviewFormDasabled" to "false" with "fetchReviewsAction.fulfilled"', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      reviews: [mockReview],
      isReviewFormDisabled: false
    };

    const result = reviewsLoad.reducer(
      undefined,
      fetchReviewsAction.fulfilled([mockReview],'', '')
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewFormDasabled" to "false" with "fetchReviewsAction.rejected"', () => {
    const expectedState = {
      reviews: [],
      isReviewFormDisabled: false
    };
    const result = reviewsLoad.reducer(
      undefined,
      fetchReviewsAction.rejected
    );
    expect(result).toEqual(expectedState);
  });

});
