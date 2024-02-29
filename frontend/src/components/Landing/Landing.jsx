import landingLogo from "../../images/landing__logo.svg";

function Landing() {
  return (
    <section className="landing">
      <img src={landingLogo} alt="Лого" className="landing__logo" />
      <h1 className="landing__title">
        SPA-Приложение для поиска и сохранения фильмов
      </h1>
    </section>
  );
}

export default Landing;
