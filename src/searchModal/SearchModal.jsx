import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { initialProducts } from "../data.js";
import "./SearchModal.scss";

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");

  const text = query.trim().toLowerCase();
  const results = text
    ? initialProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(text) ||
          product.brand?.toLowerCase().includes(text) ||
          product.category?.toLowerCase().includes(text),
      )
    : [];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="search-modal" onClick={onClose}>
      <div
        className="search-modal__window"
        aria-modal="true"
        aria-label="Search products"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal__bar">
          <span className="search-modal__icon">
            <CiSearch />
          </span>
          <div className="search-modal__field">
            <input
              type="search"
              placeholder="Search products, brands…"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button
            type="button"
            className="search-modal__close"
            aria-label="Close search"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        {text && results.length === 0 && (
          <p className="search-modal__empty">No products found for "{query}"</p>
        )}

        {results.length > 0 && (
          <ul className="search-modal__list">
            {results.slice(0, 8).map((product) => (
              <li className="search-modal__item" key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="search-modal__link"
                  onClick={onClose}
                >
                  <span className="search-modal__image">
                    <img src={product.image} alt="" />
                  </span>
                  <span className="search-modal__name">{product.name}</span>
                  <span className="search-modal__price">${product.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
