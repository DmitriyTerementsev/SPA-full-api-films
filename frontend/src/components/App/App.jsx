import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SectionFilms from "../SectionFilms/SectionFilms.jsx";
import SavedFilms from "../SavedFilms/SavedFilms.jsx";
import Account from "../Account/Account.jsx";
import Registration from "../Registration/Registration.jsx";
import Login from "../Login/Login.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import * as MainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import InfoPopup from "../InfoPopup/InfoPopup.jsx";
import InfoPopupUpdate from "../InfoPopupUpdate/InfoPopupUpdate.jsx";
import Preloader from "../PreLoader/PreLoader.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoPopupUpdateOpen, setInfoPopupUpdateOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  function handleClickBurger() {
    isActiveBurger === false
      ? setIsActiveBurger(true)
      : setIsActiveBurger(false);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies");
            setLoggedIn(true);
          }
          navigate(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (loggedIn) {
      MainApi.getUserInfo(jwt)
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });

      MainApi.getMovies(jwt)
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleRegister({ name, email, password }) {
    MainApi.register(name, email, password)
      .then(() => {
        setInfoPopupOpen(true);
        setIsSuccess(true);
        handleLogin({ email, password });
      })
      .catch((err) => {
        setInfoPopupOpen(true);
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        navigate("/movies", { replace: true });
      });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    MainApi.login(email, password)
      .then((res) => {
        if (res) {
          setInfoPopupOpen(true);
          setIsSuccess(true);
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setInfoPopupOpen(true);
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        navigate("/movies", { replace: true });
        setIsLoading(false);
      });
  }

  function handleUpdateProfile(newUserInfo) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    MainApi.updateProfileUserInfo(newUserInfo, jwt)
      .then((newUserInfo) => {
        navigate("/movies", { replace: true });
        setInfoPopupUpdateOpen(true);
        setIsUpdate(true);
        setCurrentUser(newUserInfo);
      })
      .catch((err) => {
        setInfoPopupUpdateOpen(true);
        setIsUpdate(false);
        errorHandler(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem("jwt");
    console.log(card, jwt);
    MainApi.addCard(card, jwt)
      .then((card) => {
        setSavedMovies([card, ...savedMovies]);
      })
      .catch((err) => {
        setIsSuccess(false);
        errorHandler(err);
      });
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem("jwt");
    MainApi.deleteCard(card._id, jwt)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        setIsSuccess(false);
        errorHandler(err);
      });
  }

  function errorHandler(err) {
    if (err === "Error: 401") {
      handleSignOut();
    }
  }

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  function closeAllPopup() {
    setInfoPopupOpen(false);
    setInfoPopupUpdateOpen(false);
  }

  function closeByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopup();
    }
  }

  const isOpen = setInfoPopupOpen || setInfoPopupOpen;
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopup();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isLoading && <Preloader />}
      <div className="app">
        {location.pathname === "/signin" || location.pathname === "/signup" ? (
          ""
        ) : (
          <Header
            loggedIn={loggedIn}
            isActiveBurger={isActiveBurger}
            handleClickBurger={handleClickBurger}
          />
        )}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path={"/signin"}
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Login onLogin={handleLogin} isLoading={isLoading} />
              )
            }
          />

          <Route
            path={"/signup"}
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Registration
                  onRegister={handleRegister}
                  isLoading={isLoading}
                />
              )
            }
          />

          <Route
            path={"/movies"}
            element={
              <ProtectedRoute
                path="/movies"
                component={SectionFilms}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                handleLikeFilm={handleCardLike}
                onDeleteCard={handleCardDelete}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path={"/saved-movies"}
            element={
              <ProtectedRoute
                path="/saved-movies"
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                onDeleteCard={handleCardDelete}
                component={SavedFilms}
              />
            }
          />

          <Route
            path={"/profile"}
            element={
              <ProtectedRoute
                path="/profile"
                isLoading={isLoading}
                signOut={handleSignOut}
                onUpdateUser={handleUpdateProfile}
                loggedIn={loggedIn}
                component={Account}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>

        <InfoPopup
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopup}
          isSuccess={isSuccess}
          onCloseOverlay={closeByOverlay}
        />

        <InfoPopupUpdate
          isOpen={isInfoPopupUpdateOpen}
          onClose={closeAllPopup}
          isUpdate={isUpdate}
          onCloseOverlay={closeByOverlay}
        />

        {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ? (
          <Footer />
        ) : (
          <></>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
