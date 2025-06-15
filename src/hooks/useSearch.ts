import { useState, useEffect } from 'react';
import { searchMovies } from '../api/moviesApi';
import type { Movie } from '../interface/movies';

const useSearch = (query: string, page: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setMovies([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(query, { page });
        console.log('data', data)
        setMovies(data.results);
        setTotalPages(data.total_pages);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.response.data.status_message)
        setError(error.response.data.status_message);
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  return { movies, loading, error, totalPages };
};

export default useSearch;