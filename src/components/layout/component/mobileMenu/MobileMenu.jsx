import { Link, NavLink } from "react-router-dom";
import { NAVIGATION } from "../../../../constants.js";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";

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
          <Link to="/wishlist" className="icon-btn">
            <CiHeart size={24} />
          </Link>
          <Link to="/cart" className="icon-btn">
            <CiShoppingCart size={24} />
          </Link>
          <Link to="/profile" className="icon-btn">
            <CiUser size={24} />
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default MobileMenu;
