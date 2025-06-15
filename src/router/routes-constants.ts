export const RoutePaths = {
  HOME: '/',
  SEARCH: '/search',

  MOVIE_DETAIL: (id = ':id') => `/movie/${id}`,

  NOT_FOUND: '/not-found',
};