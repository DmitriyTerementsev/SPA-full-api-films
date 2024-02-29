import "../Form/Form.css";
import Form from "../Form/Form";
import { EMAIL_REGEX } from "../../utils/constants";
import useForm from "../../hooks/useForm";


function Login({ onLogin, isLoading }) {
  const { inputValues, errorMessages, handleChange, isValid } = useForm();

  function submitUserInfo(event) {
    event.preventDefault();
    onLogin({
      email: inputValues.email,
      password: inputValues.password,
    });
  }

  return (
    <>
      <main>
        <Form
          name="login"
          welcome="Рады видеть!"
          button="Войти"
          question="Ещё не зарегистрированы?"
          path="/signup"
          link="Регистрация"
          onSubmit={submitUserInfo}
          isDisabledButton={isValid}
          isLoading={isLoading}
          noValidate
        >
          <label className="form__item">
            E-mail
            <input
              className="form__input"
              name="email"
              id="email-input"
              type="email"
              placeholder="Введите email"
              onChange={handleChange}
              pattern={EMAIL_REGEX}
              value={inputValues.email || ""}
              required
            />
            <span className="form__input-error">{errorMessages.email}</span>
          </label>

          <label className="form__item">
            Пароль
            <input
              className="form__input"
              name="password"
              id="password-input"
              type="password"
              minLength="2"
              maxLength="30"
              placeholder="Введите пароль"
              onChange={handleChange}
              value={inputValues.password || ""}
              required
            />
            <span className="form__input-error">{errorMessages.password}</span>
          </label>
        </Form>
      </main>
    </>
  );
}

export default Login;
