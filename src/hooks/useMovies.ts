import { useState, useEffect } from 'react';
import { getNowPlaying, getTopRated } from '../api/moviesApi';
import type { Movie } from '../interface/movies';

const useMovies = (
  type: 'now_playing' | 'top_rated',
  page: number
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentType, setCurrentType] = useState<string>(type);
  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    if (type !== currentType) {
      setCurrentType(type);
      setCurrentPage(1);
    } else {
      setCurrentPage(page);
    }
  }, [type, page]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data =
          currentType === 'now_playing'
            ? await getNowPlaying(currentPage)
            : await getTopRated(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.response.data.status_message)
        setError(error.response.data.status_message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentType, currentPage]);

  return { movies, loading, error, totalPages, currentPage };
};

export default useMovies;
