import type { MovieApiResponse, MovieDetail } from '../interface/movies';
import api from './index';

export const getNowPlaying = async (page: number = 1): Promise<MovieApiResponse> => {
  const response = await api.get('/movie/now_playing', {
    params: { page },
  });
  return response.data;
};

export const getTopRated = async (page: number = 1): Promise<MovieApiResponse> => {
  const response = await api.get('/movie/top_rated', {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (query: string, options: {
  page?: number;
} = {}): Promise<MovieApiResponse> => {
  const response = await api.get('/search/movie', {
    params: {
      query,
      page: options.page ?? 1,
    },
  });
  return response.data;
};

export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};
