export const getStarsStyle = (rating:number):string=>`${(Math.round(rating) * 20).toString() }%`;

export const INITIAL_CITY = 'Paris';

export const CITY_LOCATIONS = [
  {name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }},

  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }},

  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }},

  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }}
];

export const CITY_NAMES = CITY_LOCATIONS.map((item)=>item.name);

export enum SortTypes {
  POPULAR='Popular',
  PRICE_FROM_LOW='Price: low to high',
  PRICE_FROM_HIGH='Price: high to low',
  RATING='Top rated first'
}

//MDN
export function getRandomIntInclusive(min:number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
export const SORT_TYPES = Object.values(SortTypes);
