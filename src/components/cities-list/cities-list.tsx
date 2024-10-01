import {Link, useSearchParams } from 'react-router-dom';
import {AppRoute} from '../../components/app/const';
import {INITIAL_CITY} from '../../common';

type CitiesListProp = {
  cities: string[];
}


function CitiesList(props: CitiesListProp): JSX.Element {
  const {cities} = props;

  const [searchParams] = useSearchParams();
  const searchCityParams = searchParams.get('city') || INITIAL_CITY;


  return(
    <ul className="locations__list tabs__list">
      {
        cities.map((item)=>(
          <li
            key={item} className="locations__item"
          >
            <Link
              /*onClick={handleCitySelect}*/
              className={ item === searchCityParams ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to={`${AppRoute.Main}?city=${item}`}
            >
              <span>{item}</span>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
export default CitiesList;
