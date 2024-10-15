type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}


export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  }

  type Host = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    }

export type OfferPage = {
    id: OfferType['id'];
    title: OfferType['title'];
    type: OfferType['type'];
    price: OfferType['price'];
    isFavorite: OfferType['isFavorite'];
    isPremium: OfferType['isPremium'];
    rating: OfferType['rating'];
    description: string;
    bedrooms: number;
    goods: string[];
    host: Host;
    images: string[];
    maxAdults: number;
  }

export type FavoriteOffer = {
  offerId: string;
  favoriteStatus: number;
}
