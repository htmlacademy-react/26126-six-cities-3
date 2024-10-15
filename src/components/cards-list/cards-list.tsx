import {OfferType} from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

type CardsListProp = {
  offers: OfferType[];
}


function CardsList(props: CardsListProp): JSX.Element {
  const {offers} = props;
  return(
    <>
      {
        offers.map((item)=> (<PlaceCard offer={item} key={item.id}/>)
        )
      }
    </>
  );
}
export default CardsList;
