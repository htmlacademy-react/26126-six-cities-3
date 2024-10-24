import {NameSpace} from '../../store/const';
import {State} from '../../types/state';
import {Review} from '../../types/review-type';

export const getReviews = (state: Pick<State, NameSpace.ReviewsData>): Review[] => state[NameSpace.ReviewsData].reviews;

export const getDisabledReviewStatus = (state: Pick<State, NameSpace.ReviewsData>): boolean => state[NameSpace.ReviewsData].isReviewFormDasabled;


