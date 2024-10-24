import {Link} from 'react-router-dom';
import {AppRoute} from '../app/const';

function Logo(): JSX.Element {
  return (
    <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main} data-testid= "logo-link">
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </Link>
  );
}

export default Logo;
