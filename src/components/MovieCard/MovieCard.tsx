import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './MovieCard.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRef, useState } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import TextDefault from '@/components/Text/Text';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate?: string;
  className?: string;
  loading: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  releaseDate,
  className,
  loading,
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isVisible = useIntersectionObserver(cardRef as React.RefObject<HTMLElement>, { threshold: 0.1 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={loading ? '#' : `/movie/${id}`}
      className={classNames(styles.card, className, { [styles.loading]: loading })}
      ref={cardRef}
    >
      <div className={styles.posterContainer}>
        {loading || !isVisible ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <img
            src={posterPath}
            alt={title}
            className={classNames(styles.poster, { [styles.posterLoaded]: isImageLoaded })}
            onLoad={() => setIsImageLoaded(true)}
          />
        )}
      </div>
      {!loading && (
        <div className={styles.info}>
          <TextDefault
            type="R16"
            color="black"
            ellipsis
          >
            {title}
          </TextDefault>
          {releaseDate && (
            <TextDefault
              type="R14"
              color="gray-2"
              className={styles.release}
            >
              Release: {releaseDate}
            </TextDefault>
          )}
        </div>
      )}
    </Link>
  );
};

export default MovieCard;