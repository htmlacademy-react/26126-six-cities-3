import {Offers} from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';


type CardsListProp = {
  offers: Offers;
  onListItemHover: (listItemId: string) => void;
  onListItemOut: () => void;
}


function CardsList(props: CardsListProp): JSX.Element {
  const {offers, onListItemHover, onListItemOut} = props;

  return(
    <>
      {
        offers.map((item)=> (<PlaceCard offer={item} key={item.id} onListItemHover={onListItemHover} onListItemOut={onListItemOut}/>)
        )
      }
    </>
  );
}
export default CardsList;
