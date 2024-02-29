import { Link } from "react-router-dom";
import headerLogo from "../../images/header__logo.svg";
import headerProfile from "../../images/icon__COLOR_icon-main.svg";
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';

function Header({ handleClickBurger, isActiveBurger, loggedIn }) {
  const mainRoute = useLocation().pathname === "/";

  return (
    <header className={mainRoute ? "header header_section" : "header"}>
      <div className="header__container">
        <Link to="/">
          <img src={headerLogo} alt="Лого" className="header__logo" />
        </Link>

        <div
          className={
            loggedIn ? "header__links" : "header__links header__links_inactive"
          }
        >

          <NavLink to="/movies" className="header__link">
            Фильмы
          </NavLink>

          <NavLink to="/saved-movies" className="header__link">
            Сохранённые фильмы
          </NavLink>
        </div>
        <div
          className={
            loggedIn ? "header__auth header__auth_active" : "header__auth "
          }
        >
          <Link
            to="/profile"
            className={
              loggedIn
                ? "header__profile header__profile_active"
                : "header__profile"
            }
          >
            <p className="header__profile-text">Аккаунт</p>
            <div className="header__profile-icon-back">
              <img
                src={headerProfile}
                alt="icon"
                className="header__profile-icon"
              />
            </div>
          </Link>
          <Link
            to="/signup"
            className={
              mainRoute && !loggedIn
                ? "header__register header__register_active"
                : "header__register"
            }
          >
            Регистрация
          </Link>
          <Link
            to="/signin"
            className={
              mainRoute && !loggedIn
                ? "header__button header__button_active"
                : "header__button"
            }
          >
            <p className="header__button-text">Войти</p>
          </Link>
        </div>
        <button
          className={
            loggedIn
              ? "header__burger"
              : "header__burger header__burger_inactive"
          }
          onClick={handleClickBurger}
        ></button>
        <div className={isActiveBurger ? "burger burger_active" : "burger"}>
          <button className="burger__close">
            <button
              className="burger__close-icon"
              onClick={handleClickBurger}
            ></button>
          </button>
          <ul className="burger__links">
            <li>
              <NavLink to="/" className="burger__link">
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className="burger__link">
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies" className="burger__link">
                Сохранённые фильмы
              </NavLink>
            </li>
            <li>
              <Link
                to="/profile"
                className={
                  "header__profile header__profile_active header__profile_active_burger"
                }
              >
                <p className="header__profile-text">Аккаунт</p>
                <div className="header__profile-icon-back">
                  <img
                    src={headerProfile}
                    alt="icon"
                    className="header__profile-icon"
                  />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
