export const getStarsStyle = (rating:number):string=>`${(Math.round(rating) * 20).toString() }%`;

export const INITIAL_CITY = 'Paris';

export enum SortTypes {
  POPULAR='Popular',
  PRICE_FROM_LOW='Price: low to high',
  PRICE_FROM_HIGH='Price: high to low',
  RATING='Top rated first'
}
export const SORT_TYPES = Object.values(SortTypes);

