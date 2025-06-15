import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Search.module.scss";
import useSearch from "@/hooks/useSearch";
import MovieCard from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination/Pagination";
import TextDefault from "@/components/Text/Text";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");
  const query = queryParams.get("q") || "";
  const page = parseInt(queryParams.get("page") || "1", 10);

  const { movies, loading, error, totalPages } = useSearch(query, page);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", String(page));
    params.set("q", query);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, query, navigate]);

  const setPage = (newPage: number) => {
    navigate(`?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Search results for: {searchTerm}</h3>

      {error && (
        <TextDefault
          className={styles.error}
          align="center"
          type="R16"
          color="light-gray"
        >
          {error}
        </TextDefault>
      )}
      {!error && (
        <>
          {loading || (Array.isArray(movies) && movies.length > 0) ? (
            <div className={styles.movieGrid}>
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <MovieCard
                      key={`skeleton-${index}`}
                      id={0}
                      title=""
                      posterPath=""
                      loading={true}
                    />
                  ))
                : movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      posterPath={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                          : ""
                      }
                      releaseDate={movie.release_date}
                      loading={false}
                    />
                  ))}
            </div>
          ) : (
            <TextDefault
              className={styles.error}
              align="center"
              type="R16"
              color="light-gray"
            >
              {`No results found for "${query}"`}
            </TextDefault>
          )}

          {Array.isArray(movies) && movies.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
              disabled={loading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Search;
