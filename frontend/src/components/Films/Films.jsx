import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Film from "../Film/Film";
import SearchError from "../SearchError/SearchError";
import Preloader from "../PreLoader/PreLoader";

import {
  NUMBER_MOVIES_DESK,
  TABLET_ITEMS_DISP,
  MOBILE_ITEMS_DISP,
  BREAKPOINT_DESK,
  BREAKPOINT_TABL,
  SIZE_ITEMSSIXTEEN,
  SIZE_ITEMSEIGHT,
  SIZE_ITEMSFIVE,
} from "../../utils/constants";

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqError,
  isNotFound,
  handleLikeFilm,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0);
  const { pathname } = useLocation();

  function calcMoviesWidth() {
    const display = window.innerWidth;

    if (display > BREAKPOINT_DESK) {
      setShownMovies(SIZE_ITEMSSIXTEEN);
    } else if (display > BREAKPOINT_TABL) {
      setShownMovies(SIZE_ITEMSEIGHT);
    } else {
      setShownMovies(SIZE_ITEMSFIVE);
    }
  }

  useEffect(() => {
    calcMoviesWidth();
  }, [cards]);

  useEffect(() => {
    let resizeTimeout;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        calcMoviesWidth();
      }, 500);
    }
    calcMoviesWidth();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function addShownMovies() {
    const display = window.innerWidth;
    if (display > BREAKPOINT_DESK) {
      setShownMovies(shownMovies + NUMBER_MOVIES_DESK);
    } else if (display > BREAKPOINT_TABL) {
      setShownMovies(shownMovies + TABLET_ITEMS_DISP);
    } else {
      setShownMovies(shownMovies + MOBILE_ITEMS_DISP);
    }
  }

  function handleSavedMovie(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  }

  return (
    <section className="films">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время запроса произошла ошибка. Возможно, проблема с соединением. Попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="films__grid">
                {cards.map((card) => (
                  <Film
                    key={isSavedFilms ? card._id : card.id}
                    saved={handleSavedMovie(savedMovies, card)}
                    cards={cards}
                    card={card}
                    onDeleteCard={onDeleteCard}
                    handleLikeFilm={handleLikeFilm}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul className="films__grid">
                {cards.slice(0, shownMovies).map((card) => (
                  <Film
                    key={isSavedFilms ? card._id : card.id}
                    saved={handleSavedMovie(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              {cards.length > shownMovies ? (
                <button className="films__more-button" onClick={addShownMovies}>
                  Ещё
                </button>
              ) : (
                ""
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
