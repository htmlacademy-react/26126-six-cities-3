import {Review} from '../../types/review-type';
import ReviewItem from '../review/review';

type OfferProps = {
  reviews: Review[];
}

function ReviewList({reviews}:OfferProps): JSX.Element {
  return(
    <ul className="reviews__list">
      {reviews.map((item)=>(<ReviewItem review={item} key={item.id}/>))}
    </ul>
  );
}
export default ReviewList;
