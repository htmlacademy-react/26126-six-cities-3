import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';
import NotFound from './not-found';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404 not Found';
    const expectedLinkText = 'На главную';
    const linkTestId = 'main-link';


    render(withHistory(<NotFound />));
    const mainLink = screen.getByTestId(linkTestId);

    expect(screen.getAllByRole('link'));
    expect(mainLink).toHaveTextContent(expectedLinkText);
    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
  });
});
