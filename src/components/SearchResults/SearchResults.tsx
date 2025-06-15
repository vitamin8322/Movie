import { useNavigate } from "react-router-dom";
import styles from "./SearchResults.module.scss";
import Skeleton from "react-loading-skeleton";
import TextDefault from "@/components/Text/Text";
import { Movie } from "@/interface/movies";


interface SearchResultsProps {
  searchResults: Movie[];
  isSearching: boolean;
  error: string | null;
  onResultClick: () => void;
}

const SearchResults = ({ searchResults, isSearching, error, onResultClick }: SearchResultsProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.searchModal}>
      <div className={styles.searchModalContent}>
        {isSearching ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={`skeleton-${index}`} className={styles.resultItem}>
              <Skeleton className={styles.resultPosterSkeleton} />
              <div className={styles.resultInfo}>
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={14} />
              </div>
            </div>
          ))
        ) : error ? (
          <TextDefault type="R085" color="gray-1" className={styles.error}>
            Unable to load search results.
          </TextDefault>
        ) : searchResults.length > 0 ? (
          searchResults.slice(0, 5).map((movie) => (
            <div
              key={movie.id}
              className={styles.resultItem}
              onClick={() => {
                navigate(`/movie/${movie.id}`);
                onResultClick();
              }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/movie/${movie.id}`);
                  onResultClick();
                }
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className={styles.resultPoster}
                loading="lazy"
              />
              <div className={styles.resultInfo}>
                <TextDefault type="R10" color="light-gray" ellipsis className={styles.resultTitle}>
                  {movie.title}
                </TextDefault>
                <TextDefault type="R085B" color="gray-1" className={styles.resultDetails}>
                  {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"} •{" "}
                  {movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : "N/A"}
                </TextDefault>
              </div>
            </div>
          ))
        ) : (
          <TextDefault className={styles.noResults} type="R9" color="gray-1">
            No results
          </TextDefault>
        )}
      </div>
    </div>
  );
};

export default SearchResults;