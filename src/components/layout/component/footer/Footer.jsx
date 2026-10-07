import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa6";
import logo from "../../../../../public/itemsPhotos/Logo (3).png";
import "./Footer.scss";

const services = [
  "Bonus program",
  "Gift cards",
  "Credit and payment",
  "Service contracts",
  "Non-cash account",
  "Payment",
];

const assistance = [
  "Find an order",
  "Terms of delivery",
  "Exchange and return of goods",
  "Guarantee",
  "Frequently asked questions",
  "Terms of use of the site",
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_inner container">
        <div className="footer_about">
          <div className="footer_about-top">
            <img className="footer_logo" src={logo} alt="Cyber" />
            <p className="footer_text">
              We are a residential interior design firm located in Portland. Our
              boutique-studio offers more than
            </p>
          </div>

          <div className="footer_socials">
            <a className="footer_social-link" href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a className="footer_social-link" href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a className="footer_social-link" href="#" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a className="footer_social-link" href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer_col footer_col-services">
          <h4 className="footer_title">Services</h4>
          <ul className="footer_list">
            {services.map((item) => (
              <li className="footer_item" key={item}>
                <Link className="footer_link" to="/products">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer_col footer_col-assistance">
          <h4 className="footer_title">Assistance to the buyer</h4>
          <ul className="footer_list">
            {assistance.map((item) => (
              <li className="footer_item" key={item}>
                <Link className="footer_link" to="/products">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
