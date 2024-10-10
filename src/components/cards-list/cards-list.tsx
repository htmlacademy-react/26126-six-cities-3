import {OfferType} from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

import {MouseEvent, useCallback} from 'react';

import {useAppDispatch} from '../../hooks/index';
import {hoverOffer} from '../../store/action';

type CardsListProp = {
  offers: OfferType[];
}


function CardsList(props: CardsListProp): JSX.Element {
  const {offers} = props;
  const dispatch = useAppDispatch();
  const handleMouseOver = useCallback((event: MouseEvent<HTMLLIElement>)=> {
    event.preventDefault();
    if(event.currentTarget.dataset.id) {
      dispatch(hoverOffer(event.currentTarget.dataset.id));
    }
  }, [dispatch]);
  const handleMouseOut = useCallback(()=> {
    dispatch(hoverOffer(''));
  }, [dispatch]);

  return(
    <>
      {
        offers.map((item)=> (<PlaceCard offer={item} key={item.id} mouseOver={handleMouseOver} mouseOut={handleMouseOut}/>)
        )
      }
    </>
  );
}
export default CardsList;
