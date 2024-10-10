import {NameSpace} from '../../store/const';
import {State} from '../../types/state';
import {Review} from '../../types/review-type';

export const getReviews = (state: State): Review[] => state[NameSpace.ReviewsData].reviews;


