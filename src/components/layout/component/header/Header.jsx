import { Link, NavLink } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser, CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useCart } from "../../../cartContext/CartContext.jsx";
import { useWishlist } from "../../../wishlistContext/WishlistContext.jsx";
// import {Wishlist} from "../../../../pages/wishListContext/"
import MobileMenu from "../mobileMenu/MobileMenu.jsx";
import { NAVIGATION } from "../../../../constants.js";
import "./Header.scss";
import classNames from "classnames";

const getActiveClass = ({ isActive }) => (isActive ? "active-link" : "");

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const totalItems =
    cart && Array.isArray(cart)
      ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
      : 0;
  const likedItems = wishlist.length;

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
          <input
            className="search-icon_input"
            type="text"
            placeholder="Search"
          />
        </div>

        <nav className="nav-links">
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={classNames("nav-links_a", getActiveClass)}
              onClick={closeMenu}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="nav-icons">
          <div className="iconCircle">
            <Link to="/wishlist" className="icon-btn">
              <CiHeart size={24} />
              {likedItems > 0 && <span className="badge">{likedItems}</span>}
            </Link>
          </div>
          <div className="iconCircle">
            <Link to="/cart" className="icon-btn">
              <CiShoppingCart size={24} />
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </Link>
          </div>
          <div className="iconCircle iconCircle--profile">
            <Link to="/profile" className="icon-btn">
              <CiUser size={24} />
            </Link>
          </div>

          <button className="menuBtn" onClick={toggleMenu}>
            <RxHamburgerMenu size={24} />
          </button>
        </div>
      </header>
      <MobileMenu closeMenu={closeMenu} isOpen={isOpen} />{" "}
    </>
  );
}
