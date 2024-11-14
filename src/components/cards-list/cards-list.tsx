import {OfferType} from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

type CardsListProp = {
  offers: OfferType[];
  isNearList: boolean;
}


function CardsList(props: CardsListProp): JSX.Element {
  const {offers, isNearList} = props;
  return(
    <>
      {
        offers.map((item)=> (<PlaceCard offer={item} key={item.id} isNearCard={isNearList}/>)
        )
      }
    </>
  );
}
export default CardsList;
