import { Link, NavLink } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";

import { NAVIGATION } from "../../../../constants.js";
import "./MobileMenu.scss";

const getActiveClass = ({ isActive }) => (isActive ? "active-link" : "");

const MobileMenu = ({ closeMenu }) => {
  return (
    <div className="mobile-menu">
      <button className="mobile-menu__close" onClick={closeMenu}>
        <span className="mobile-menu__close-icon">X</span>
      </button>

      <ul className="mobile-menu__list">
        {NAVIGATION.map((item) => (
          <li className="page-link" key={item.to}>
            <NavLink
              to={item.to}
              className={getActiveClass}
              onClick={closeMenu}
            >
              {item.name}
            </NavLink>
          </li>
        ))}

        <div className="mobile-menu__links">
          <Link
            to="/wishlist"
            className="mobile-menu__icon-btn"
            onClick={closeMenu}
          >
            <CiHeart size={28} />
          </Link>

          <Link
            to="/cart"
            className="mobile-menu__icon-btn"
            onClick={closeMenu}
          >
            <CiShoppingCart size={28} />
          </Link>

          <Link
            to="/profile"
            className="mobile-menu__icon-btn"
            onClick={closeMenu}
          >
            <CiUser size={28} />
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default MobileMenu;
