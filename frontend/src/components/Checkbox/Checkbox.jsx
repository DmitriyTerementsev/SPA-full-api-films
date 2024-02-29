function FilterCheckbox({ onFilterMoviesFilms, isShortMovies }) {
  return (
    <div className="search__toggle">
      <input
        className="search__checkbox"
        type="checkbox"
        onChange={onFilterMoviesFilms}
        checked={isShortMovies}
      ></input>
      <span className="search__toggle-title">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
