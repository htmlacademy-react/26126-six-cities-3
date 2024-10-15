import {Link, useSearchParams } from 'react-router-dom';

import {AppRoute} from '../../components/app/const';
import {INITIAL_CITY, CITY_LOCATIONS} from '../../common';

function CitiesList(): JSX.Element {


  const [searchParams] = useSearchParams();
  const searchCityParams = searchParams.get('city') || INITIAL_CITY;


  return(
    <ul className="locations__list tabs__list">
      {
        CITY_LOCATIONS.map((item)=>(
          <li
            key={item.name} className="locations__item"
          >
            <Link
              className={ item.name === searchCityParams ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to={`${AppRoute.Main}?city=${item.name}`}
            >
              <span>{item.name}</span>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
export default CitiesList;
