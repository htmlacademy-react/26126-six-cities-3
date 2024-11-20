import {render, screen } from '@testing-library/react';
import ReviewItem from './review';
import {makeFakeReview} from '../../utils/mocks';


describe('Component: ReviewItem', () => {
  it('should render correct', () => {
    const fakeReview = makeFakeReview();
    const reviewContainerTestId = 'review-item';
    const avatarTestId = 'avatar';

    render(<ReviewItem review={fakeReview}/>);
    const reviewContainer = screen.getByTestId(reviewContainerTestId);
    const avatarImage = screen.getByTestId(avatarTestId);

    expect(reviewContainer).toBeInTheDocument();
    expect(avatarImage);
    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
  });
});
