import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {MouseEvent} from 'react';
import {sortOffers} from '../../store/action';
import {useEffect} from 'react';

type SortProps = {
  sortTypes: string[];
}

function Sort({sortTypes}:SortProps): JSX.Element {

  const [sortTypesList, setSortTypesList] = useState(false);

  function handleSortingArrow(){
    setSortTypesList(!sortTypesList);
  }
  useEffect(()=>{
    if(sortTypesList){
      const onEscKeyDown = (event:KeyboardEvent) => {
        event.preventDefault();
        if(event.key === 'Escape') {
          setSortTypesList(!sortTypesList);
        }
      };
      document.addEventListener('keydown', onEscKeyDown);
      return ()=> {
        document.removeEventListener('keydown', onEscKeyDown);
      };
    }

  },[sortTypesList]);
  const dispatch = useAppDispatch();
  const actualSort = useAppSelector((state) => state.sort);

  const handleSortSelect = (event: MouseEvent<HTMLLIElement>)=>{
    const value = event.currentTarget.innerText;
    dispatch(sortOffers(value));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handleSortingArrow} className="places__sorting-type" tabIndex={0}>
        {actualSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={sortTypesList ? 'places__options places__options--custom places__options--opened' : 'places__options places__options--custom'}>
        {sortTypes.map((type)=>(
          <li
            onClick={handleSortSelect}
            key={type}
            className={type === actualSort ? 'places__option places__option--active' : 'places__option'}
            tabIndex={0}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;

