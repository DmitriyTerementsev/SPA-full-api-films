import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <Link to={-1} className="not-found__link">
        <p className="not-found__link">Назад</p>
      </Link>
    </div>
  );
}

export default NotFoundPage;
