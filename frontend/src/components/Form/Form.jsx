import { Link } from "react-router-dom";
import headerLogo from "../../images/header__logo.svg";

function Form({
  welcome,
  name,
  children,
  button,
  question,
  path,
  link,
  onSubmit,
  isDisabledButton,
  isLoading,
}) {
  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link">
          <img className="form__logo" src={headerLogo} alt="Logo"></img>
        </Link>
        <h3 className="form__title"> {welcome} </h3>
        <form
          className="form__inputs"
          name={`${name}-form`}
          id="form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            disabled={isDisabledButton ? false : true}
            className={
              isDisabledButton || isLoading
                ? "form__button-save"
                : "form__button-save form__button-save_inactive"
            }
          >
            {button}
          </button>
        </form>

        <p className="form__text">
          {question}
          <Link to={path} className="form__link">
            {link}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Form;
