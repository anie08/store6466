import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa6";
import LogoIcon from "../../../../assets/logo.svg?react";
import "./Footer.scss";
const shopLinks = [
  { name: "All Products", to: "/products" },
  { name: "Summer Sale", to: "/products/iphone" },
  { name: "iPhone 14 Pro Max", to: "/products/1" },
  { name: "Wishlist", to: "/wishlist" },
  { name: "Cart", to: "/cart" },
];

const assistanceLinks = [
  { name: "Checkout", to: "/checkout" },
  { name: "Shipping address", to: "/checkout/address" },
  { name: "Shipping shipping", to: "/checkout/shipping" },
  { name: "Shipping checkout", to: "/checkout/checkout" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_inner container">
        <div className="footer_about">
          <div className="footer_about-top">
            <LogoIcon className="footer_logo" aria-label="Cyber" role="img" />
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
            {shopLinks.map((item) => (
              <li className="footer_item" key={item.name}>
                <Link className="footer_link" to={item.to}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer_col footer_col-assistance">
          <h4 className="footer_title">Assistance to the buyer</h4>
          <ul className="footer_list">
            {assistanceLinks.map((item) => (
              <li className="footer_item" key={item.name}>
                <Link className="footer_link" to={item.to}>
                  {item.name}
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
