import {useState, FormEvent, ChangeEvent, useRef} from 'react';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {postReviewAction} from '../../store/api-actions';
import {getDisabledReviewStatus} from '../../store/reviews-load/selectors';
import {getDataOffer} from '../../store/offers-load/selectors';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
const MIN_RATING = 1;

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);

  const offer = useAppSelector(getDataOffer);

  const disabled = useAppSelector(getDisabledReviewStatus);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleRatingButtonClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (offer && comment !== null && rating !== null) {
      dispatch(postReviewAction({
        pageId: offer.id,
        comment: comment,
        rating: rating,
      })).unwrap().then(()=>{
        if(formRef.current){
          formRef.current.reset();
        }
        setComment('');
        setRating(0);
      });
    }
  };

  return (
    <form data-testid="form-review" ref={formRef} onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
                Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          data-testid ="input-star"
          onInput = {handleRatingButtonClick}
          disabled={disabled}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          data-testid ="input-star"
          onInput = {handleRatingButtonClick}
          disabled={disabled}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          data-testid ="input-star"
          onInput = {handleRatingButtonClick}
          disabled={disabled}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          data-testid ="input-star"
          onInput = {handleRatingButtonClick}
          disabled={disabled}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          data-testid ="input-star"
          onInput = {handleRatingButtonClick}
          disabled={disabled}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-stars"
          type="radio"
        />
        <label
          htmlFor="1-stars"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        data-testid = "comment-text"
        disabled={disabled}
        onInput={handleReviewChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        minLength={MIN_COMMENT_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                  To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
                  your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          disabled={comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && rating >= MIN_RATING ? disabled : true}
          className="reviews__submit form__submit button"
          type="submit"

        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
