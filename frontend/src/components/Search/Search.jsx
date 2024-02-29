import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../Checkbox/Checkbox";

function SearchForm({ searchFilterMovie, onFilterMoviesFilms, isShortMovies, isNotFound }) {
  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/movies" && localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch");
      setQuery(localQuery);
    }
  }, [location]);

  function submitUserInfo(e) {
    e.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      searchFilterMovie(query);
    }
  }

  function handleChangeQuery(event) {
    setQuery(event.target.value);
  }

  return (
    <form className="search" id="form" onSubmit={submitUserInfo}>
      <div className="search__container">
        <input
          className="search__input"
          name="query"
          id="search-input"
          type="text"
          placeholder={isNotFound? 'Введите название фильма': "Фильмы"}
          onChange={handleChangeQuery}
          value={query || ""}
        />
        <button className="search__button" type="submit" />
      </div>

      <FilterCheckbox
        isShortMovies={isShortMovies}
        onFilterMoviesFilms={onFilterMoviesFilms}
      />
      {isQueryError && ( <span className="search__form-error">Введите ключевое слово</span>)}

    </form>
  );
}

export default SearchForm;


