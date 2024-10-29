import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import {AuthorizationStatus} from '../../store/const';
import {makeFakeStore, makeFakeOfferCard} from '../../utils/moks';
import ReviewForm from './review-form';
//import {postReviewAction} from '../../store/api-actions';

import {APIRoute} from '../../store/const';
import { extractActionsTypes } from '../../utils/moks';

describe('Component: ReviewForm', () => {
  it('should render correctly', async () => {
    const STARS_COUNT = 5;
    const inputStarId = 'input-star';
    const commentPlaceholder = 'Tell how was your stay, what you like and what can be improved';

    const withHistoryComponent = withHistory(<ReviewForm />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDasabled: false,
      email: ''
    } }));

    const preparedComponent = withStoreComponent;
    render(preparedComponent);

    const starInputs = screen.getAllByTestId(inputStarId);

    await userEvent.click(starInputs[0]);
    expect(starInputs[0]).toBeChecked();

    expect(screen.getByPlaceholderText(commentPlaceholder)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(starInputs.length).toBe(STARS_COUNT);

  });
  it('should render correctly when user enter comment', async () => {
    const inputStarId = 'input-star';
    const textAreaId = 'comment-text';
    const expectedcommentValue = 'keks';
    const expectedInputStarValue = '5';
    const withHistoryComponent = withHistory(<ReviewForm />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDasabled: false,
      email: ''
    } }));

    const preparedComponent = withStoreComponent;

    render(preparedComponent);
    const starInputs = screen.getAllByTestId(inputStarId);

    await userEvent.type(
      screen.getByTestId(textAreaId),
      expectedcommentValue,
    );

    await userEvent.type(
      starInputs[0],
      expectedInputStarValue,
    );

    expect(screen.getByDisplayValue(expectedInputStarValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedcommentValue)).toBeInTheDocument();
  });
  it('should not dispatch postReviewAction with empty review', async () => {
    const fakeOffer = makeFakeOfferCard();
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ReviewForm />, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDasabled: false,
      email: ''
    },
    DATA_REVIEWS: {
      reviews: [],
      isReviewFormDasabled: false
    }
    }));
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/${fakeOffer.id}`).reply(200, []);
    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());


    expect(actions).toEqual([]);
  });
});
