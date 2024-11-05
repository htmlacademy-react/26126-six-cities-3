import {Review} from '../../types/review-type';
import ReviewItem from '../review/review';

type OfferProps = {
  reviews: Review[];
}

function ReviewList({reviews}:OfferProps): JSX.Element {

  const slicedReviews = [...reviews];
  const soretedReviews = slicedReviews.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,10);

  return(
    <ul className="reviews__list">
      { soretedReviews.map((item)=>(<ReviewItem review={item} key={item.id}/>))}
    </ul>
  );
}
export default ReviewList;
