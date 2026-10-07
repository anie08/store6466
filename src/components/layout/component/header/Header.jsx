import { Link, NavLink } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser, CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

import MobileMenu from "../mobileMenu/MobileMenu.jsx";
import { NAVIGATION } from "../../../../constants.js";
import "./Header.scss";

const getActiveClass = ({ isActive }) => (isActive ? "active-link" : "");

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="header container">
        <div className="logo">
          <Link to="/" className="logo_link">
            <img src="/itemsPhotos/Logo (2).png" alt="logo" />
          </Link>
        </div>

        <div className="search-bar">
          <CiSearch className="search-icon" size={20} />
          <input type="text" placeholder="Search" />
        </div>

        <nav className="nav-links">
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={getActiveClass}
              onClick={closeMenu}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="nav-icons">
          <Link to="/wishlist" className="icon-btn">
            <CiHeart size={24} />
          </Link>

          <Link to="/cart" className="icon-btn">
            <CiShoppingCart size={24} />
          </Link>

          <Link to="/profile" className="icon-btn">
            <CiUser size={24} />
          </Link>

          <button className="menuBtn" onClick={toggleMenu}>
            <RxHamburgerMenu size={24} />
          </button>
        </div>
      </header>

      {isOpen && <MobileMenu closeMenu={closeMenu} />}
    </>
  );
}
