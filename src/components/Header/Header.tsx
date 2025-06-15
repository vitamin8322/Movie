import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "./Header.module.scss";
import { RoutePaths } from "@/router";
import useDebounce from "@/hooks/useDebounce";
import useSearch from "@/hooks/useSearch";
import Input from "@/components/Input/Input";
import TextDefault from "@/components/Text/Text";
import SearchResults from "@/components/SearchResults/SearchResults";
import Button from "../Button/Button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const {
    movies: searchResults,
    loading: isSearching,
    error,
  } = useSearch(debouncedSearchQuery, 1);

  const isNowPlayingActive =
    location.pathname === RoutePaths.HOME &&
    !location.search.includes("top_rated");
  const isTopRatedActive = location.search.includes("top_rated");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`${RoutePaths.SEARCH}?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleNowPlaying = () => {
    navigate(RoutePaths.HOME);
    setSearchQuery("");
  };

  const handleTopRated = () => {
    navigate(`${RoutePaths.HOME}?type=top_rated`);
    setSearchQuery("");
  };

  const handleClickOutside = (e: MouseEvent) => {
    const searchContainer = document.querySelector(
      `.${styles.searchContainer}`
    );
    if (searchContainer && !searchContainer.contains(e.target as Node)) {
      setSearchQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <TextDefault
        className={styles.logo}
        type="R18"
        color="primary"
        onClick={() => navigate(RoutePaths.HOME)}
      >
        Movies App
      </TextDefault>
      <nav className={styles.nav}>
        <Button
          variant="secondary"
          size="medium"
          className={classNames(styles.tab, {
            [styles.active]: isNowPlayingActive,
          })}
          onClick={handleNowPlaying}
        >
          <TextDefault type="R10" color="light-gray">
            Now Playing
          </TextDefault>
        </Button>
        <Button
          variant="secondary"
          size="medium"
          className={classNames(styles.tab, {
            [styles.active]: isTopRatedActive,
          })}
          onClick={handleTopRated}
        >
          <TextDefault type="R10" color="light-gray">
            Top Rated
          </TextDefault>
        </Button>
      </nav>
      <div className={styles.searchContainer}>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyPress={handleSearch}
          className={styles.searchInput}
        />
        {(searchQuery || isSearching) && (
          <SearchResults
            searchResults={searchResults}
            isSearching={isSearching}
            error={error}
            onResultClick={() => {
              setSearchQuery("");
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
