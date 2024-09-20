import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import {Helmet} from 'react-helmet-async';

function NotFound():JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>not found</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Not Found</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <p className="cities__status-description">
                  Page is not Found
                </p>
                <Link to="/">На главную</Link>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
