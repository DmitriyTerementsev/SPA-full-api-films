import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import Films from "../Films/Films";
import {
  filterMoviesFilms,
  filterDurationTime,
} from "../../utils/moviesFilter";
import * as movies from "../../utils/MoviesApi";

function SectionFilms({ handleLikeFilm, onDeleteCard, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReqError, setIsReqError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [initialCardsMovies, setInitialCardsMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);

  function handleFilterMovie(movies, query, short) {
    const moviesCardList = filterMoviesFilms(movies, query, short);
    setInitialCardsMovies(moviesCardList);
    setFilteredMovies(
      short ? filterDurationTime(moviesCardList) : moviesCardList
    );
    localStorage.setItem("movies", JSON.stringify(moviesCardList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  function searchFilterMovie(query) {
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("shortMovies", isShortMovies);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleFilterMovie(movies, query, isShortMovies);
    } else {
      setIsLoading(true);
      movies
        .getMovies()
        .then((cardsData) => {
          handleFilterMovie(cardsData, query, isShortMovies);
          setIsReqError(false);
        })
        .catch((err) => {
          setIsReqError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleShortFilterCheckbox() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (filterDurationTime(initialCardsMovies).length === 0) {
        setFilteredMovies(filterDurationTime(initialCardsMovies));
      } else {
        setFilteredMovies(filterDurationTime(initialCardsMovies));
      }
    } else {
      setFilteredMovies(initialCardsMovies);
    }
    localStorage.setItem("shortMovies", !isShortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialCardsMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDurationTime(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(true);
    }
  }, [filteredMovies.length]);

  return (
    <section className="section-films">
      <Search
        onFilterMoviesFilms={handleShortFilterCheckbox}
        searchFilterMovie={searchFilterMovie}
        isShortMovies={isShortMovies}
        isNotFound={isNotFound}
      />
      <Films
        cards={filteredMovies}
        isLoading={isLoading}
        handleLikeFilm={handleLikeFilm}
        onDeleteCard={onDeleteCard}
        isSavedFilms={false}
        isReqError={isReqError}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
      />
    </section>
  );
}

export default SectionFilms;
