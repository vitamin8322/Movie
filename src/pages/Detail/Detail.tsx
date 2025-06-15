import { useParams } from "react-router-dom";
import styles from "./Detail.module.scss";
import { useEffect, useRef, useState } from "react";
import { getMovieDetail } from "@/api/moviesApi";
import { MovieDetail } from "@/interface/movies";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import TextDefault from "@/components/Text/Text";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const posterRef = useRef<HTMLImageElement>(null);
  const isVisible = useIntersectionObserver(
    posterRef as React.RefObject<HTMLElement>
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getMovieDetail(Number(id));
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Skeleton width={300} height={40} />
          <Skeleton width={250} />
          <div className={styles.rating}>
            <Skeleton width={80} />
            <Skeleton width={100} />
            <Skeleton width={120} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.posterContainer}>
            <Skeleton height={450} width={300} />
          </div>
          <div className={styles.details}>
            <Skeleton count={4} />
            <div className={styles.genres}>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} width={60} />
              ))}
            </div>
            <div className={styles.info}>
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} width={200} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <TextDefault type="R10" color="medium-gray" className={styles.error}>
        {error}
      </TextDefault>
    );
  }
  if (!movie) return null;

  const imageSrc =
    movie.poster_path && isVisible
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.name}>
          <TextDefault type="R25" color="medium-gray" className={styles.title}>
            {movie.title}
          </TextDefault>
          {movie.tagline && (
            <TextDefault
              type="R12"
              color="medium-gray"
              className={styles.tagline}
            >
              {movie.tagline}
            </TextDefault>
          )}
        </div>
        <div className={styles.rating}>
          <TextDefault
            type="R10B"
            color="medium-gray"
            className={styles.imdbRating}
          >
            IMDb {movie.vote_average.toFixed(1)}/10
          </TextDefault>
          <TextDefault
            type="R10"
            color="dark-medium-gray"
            className={styles.popularity}
          >
            Popularity {movie.popularity.toFixed(1)}
          </TextDefault>
          <TextDefault
            type="R10"
            color="dark-medium-gray"
            className={styles.voteCount}
          >
            {movie.vote_count} votes
          </TextDefault>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.posterContainer}>
          <img
            ref={posterRef}
            src={imageSrc}
            alt={movie.title}
            className={`${styles.poster} ${isLoaded ? styles.loaded : ""}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        </div>
        <div className={styles.details}>
          <TextDefault
            type="R10"
            color="medium-gray"
            className={styles.overview}
          >
            {movie.overview}
          </TextDefault>
          <div className={styles.genres}>
            {movie.genres.map((genre) => (
              <TextDefault
                key={genre.id}
                type="R09B"
                color="medium-gray"
                className={styles.genre}
              >
                {genre.name}
              </TextDefault>
            ))}
          </div>
          <div className={styles.info}>
            <TextDefault type="R10" color="dark-medium-gray">
              <TextDefault type="R10" color="medium-gray">
                Original Title:
              </TextDefault>{" "}
              {movie.original_title}
            </TextDefault>
            <TextDefault type="R10" color="dark-medium-gray">
              <TextDefault type="R10" color="medium-gray">
                Release Date:
              </TextDefault>{" "}
              {movie.release_date}
            </TextDefault>
            <TextDefault type="R10" color="dark-medium-gray">
              <TextDefault type="R10" color="medium-gray">
                Runtime:
              </TextDefault>{" "}
              {movie.runtime} minutes
            </TextDefault>
            <TextDefault type="R10" color="dark-medium-gray">
              <TextDefault type="R10" color="medium-gray">
                Languages:
              </TextDefault>{" "}
              {movie.spoken_languages
                .map((lang) => lang.english_name)
                .join(", ")}
            </TextDefault>
            <TextDefault type="R10" color="dark-medium-gray">
              <TextDefault type="R10" color="medium-gray">
                Production Companies:
              </TextDefault>{" "}
              {movie.production_companies
                .map((company) => company.name)
                .join(", ")}
            </TextDefault>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
