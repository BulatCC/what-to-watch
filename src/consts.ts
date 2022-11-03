const ButtonFontSize = {
    SM: 'SM',
    MD: 'MD',
};

const TabNameList = {
    Overview: 'Overview',
    Details: 'Details',
    Reviews: 'Reviews',
};

const AppRoute = {
    Root: '/',
    NotFound: '*',
    Login: '/login',
    MyList: '/mylist',
    FilmId: '/film/:id',
    Film: '/film',
    Review: '/film/:id/review',
    Player: '/player/:id',
};

const ApiRoute = {
    Films: '/films',
    Comments: '/comments',
    Promo: '/promo',
    Login: '/login',
    Logout: '/logout',
    Favorite: '/favorite',
};

const FilmRateDescription = {
    Bad: 'Bad',
    Normal: 'Normal',
    Good: 'Good',
    VeryGood: 'Very good',
    Awesome: 'Awesome',
    NotRated: 'Not rated',
}

const DEFAULT_GENRE = 'All genres';

const AuthorizationStatus = {
    Auth: 'AUTH',
    NoAuth: 'NO_AUTH',
    Unknown: 'UNKNOWN',
  };
  

export { 
    ButtonFontSize, 
    TabNameList, 
    AppRoute, 
    FilmRateDescription, 
    DEFAULT_GENRE, 
    AuthorizationStatus,
    ApiRoute,
}