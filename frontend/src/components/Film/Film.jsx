import { durationConverterTime } from "../../utils/moviesFilter";

function Film({
  card,
  isSavedFilms,
  handleLikeFilm,
  onDeleteCard,
  saved,
  savedMovies,
}) {
  function onCardClick() {
    if (saved) {
      const savedMovie = savedMovies.find((item) => card.id === item.movieId);
      onDeleteCard(savedMovie);
    } else {
      handleLikeFilm(card);
    }
  }

  function onDelete() {
    onDeleteCard(card);
  }

  const cardLikeButton = `${
    saved ? "film__like-button film__like-button_active" : "film__like-button"
  }`;

  return (
    <li key={card.id} className="film">
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="film__picture"
          src={
            isSavedFilms
              ? card.image
              : `https://api.nomoreparties.co/${card.image.url}`
          }
          alt={card.nameRU}
        />
      </a>
      <div className="film__header">
        <h2 className="film__title">{card.nameRU}</h2>

        {isSavedFilms ? (
          <button
            type="button"
            className="film__button-delete"
            onClick={onDelete}
          ></button>
        ) : (
          <button
            type="button"
            className={cardLikeButton}
            onClick={onCardClick}
          ></button>
        )}
      </div>

      <p className="film__duration"> {durationConverterTime(card.duration)}</p>
    </li>
  );
}

export default Film;
