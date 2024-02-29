import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { EMAIL_REGEX, NAME_REGEX } from "../../utils/constants";
import useForm from "../../hooks/useForm";

function Account({ isLoading, signOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { inputValues, errorMessages, handleChange, isValid, resetForm } =
    useForm();
  const [isLastValues, setIsLastValues] = useState(false);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  function submitUserInfo(event) {
    event.preventDefault();
    onUpdateUser({
      name: inputValues.name,
      email: inputValues.email,
    });
  }

  useEffect(() => {
    if (
      currentUser.name === inputValues.name &&
      currentUser.email === inputValues.email
    ) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
  }, [inputValues]);

  return (
    <>
      <main className="account">
        <div className="account__container">
          <h3 className="account__welcome">Привет, {currentUser.name}!</h3>
          <form
            className="account__form"
            name="account"
            id="form"
            onSubmit={submitUserInfo}
            noValidate
          >
            <label className="account__field">
              <span className="account__label">Имя</span>
              <input
                className="account__input"
                type="text"
                name="name"
                id="name-input"
                placeholder="Ваше имя"
                minLength="2"
                maxLength="35"
                required
                onChange={handleChange}
                pattern={NAME_REGEX}
                value={inputValues.name || ""}
                autoComplete="off"
              />
              <span className="account__error">{errorMessages.name}</span>
            </label>
            <label className="account__field">
              <span className="account__label">E-mail</span>
              <input
                className="account__input"
                type="email"
                name="email"
                id="email-input"
                placeholder="E-mail"
                minLength="2"
                maxLength="35"
                required
                onChange={handleChange}
                pattern={EMAIL_REGEX}
                value={inputValues.email || ""}
                autoComplete="off"
              />
              <span className="account__error">{errorMessages.email}</span>
            </label>
            <button
              type="submit"
              disabled={!isValid ? true : false}
              className={
                !isValid || isLoading || isLastValues
                  ? "account__button-save form__button-save_inactive"
                  : "account__button-save"
              }
            >
              Редактировать
            </button>
            <button
              className="account__logout hover-button"
              type="button"
              onClick={signOut}
            >
              Выйти из аккаунта
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Account;
