import { useState, useEffect } from "react";
import Films from "../Films/Films";
import {
  filterMoviesFilms,
  filterDurationTime,
} from "../../utils/moviesFilter";
import Search from "../Search/Search";

function SavedMovies({ savedMovies, onDeleteCard }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function searchFilterMovie(query) {
    setSearchQuery(query);
  }

  function handleShortFilterCheckbox() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesCardList = filterMoviesFilms(savedMovies, searchQuery);
    setFilteredMovies(
      isShortMovies ? filterDurationTime(moviesCardList) : moviesCardList
    );
  }, [savedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <section className="section-films">
      <Search
        searchFilterMovie={searchFilterMovie}
        onfilterMoviesFilms={handleShortFilterCheckbox}
      />
      <Films
        cards={filteredMovies}
        savedMovies={savedMovies}
        isNotFound={isNotFound}
        isSavedFilms={true}
        onDeleteCard={onDeleteCard}
      />
    </section>
  );
}

export default SavedMovies;
