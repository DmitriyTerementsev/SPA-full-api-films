import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__line"></div>
        <div className="footer__copyright">
          <p className="footer__author">Dmitriy Terementsev &#169;</p>
          <ul className="footer__links">
            <li className="footer__link">
              <Link
                to="https://vk.com/mr.alchimik"
                target="_blank"
                className="footer__nav-link"
              >
                VK
              </Link>
            </li>

            <li className="footer__link">
              <Link
                to="https://github.com/DmitriyTerementsev"
                target="_blank"
                className="footer__nav-link"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
