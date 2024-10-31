import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Logo from './logo';


describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';
    const linkTestId = 'logo-link';

    const preparedComponent = withHistory(<Logo />);
    render(preparedComponent);

    expect(screen.getByRole('link'));
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByTestId(linkTestId));
  });
});
