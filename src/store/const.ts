export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments'
}
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameSpace {
  OffersData = 'DATA_OFFERS',
  ReviewsData = 'DATA_REVIEWS',
  User = 'USER',
  AppActions = 'APP_ACTIONS',
}
