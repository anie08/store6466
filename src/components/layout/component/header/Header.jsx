import { Link, NavLink } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser, CiSearch } from "react-icons/ci";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header container">
      <div className="logo">
        <Link to="/">
          <img src="/itemsPhotos/Logo%20(1).png" />
        </Link>
      </div>

      <div className="search-bar">
        <CiSearch className="search-icon" size={20} />
        <input type="text" placeholder="Search" />
      </div>

      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Blog
        </NavLink>
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
      </div>
    </header>
  );
}
