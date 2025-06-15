import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
import useMovies from "@/hooks/useMovies";
import MovieCard from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination/Pagination";
import TextDefault from "@/components/Text/Text";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("type") === "top_rated" ? "top_rated" : "now_playing";

  const [page, setPage] = useState(1);

  const { movies, loading, error, totalPages } = useMovies(tab, page);

  useEffect(() => {
    setPage(1);
    const params = new URLSearchParams(location.search);
    params.set("page", String(1));
    params.set("type", tab);
    navigate(`?${params.toString()}`, { replace: true });
  }, [tab, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", String(page));
    params.set("type", tab);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, tab, navigate]);

  return (
    <div className={styles.container}>
      {error && <TextDefault className={styles.error} align="center" type="R16" color="light-gray">{error}</TextDefault>}
      {!error && (
        <>
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
                    posterPath={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    releaseDate={movie.release_date}
                    loading={false}
                  />
                ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {setPage(newPage)}}
            disabled={loading}
          />
        </>
      )}
    </div>
  );
};

export default Home;