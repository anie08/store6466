import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import classNames from "classnames";
import { initialProducts } from "../data.js";
import "./SearchModal.scss";

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const text = query.trim().toLowerCase();
  const results = text
    ? initialProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(text) ||
          product.brand?.toLowerCase().includes(text) ||
          product.category?.toLowerCase().includes(text),
      )
    : [];

  const close = () => {
    setShowResults(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") close();
    };
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) close();
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = () => {
    setQuery("");
    close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/products/${results[0].id}`);
      handleSelect();
    }
  };

  return (
    <div
      className={classNames("search-modal", { "search-modal--open": isOpen })}
    >
      <div className="search-modal__window" ref={boxRef}>
        <form
          className="search-modal__bar"
          role="search"
          onSubmit={handleSubmit}
        >
          <span className="search-modal__icon">
            <CiSearch />
          </span>

          <div className="search-modal__field">
            <input
              ref={inputRef}
              type="search"
              placeholder="Search"
              aria-label="Search products"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
          </div>

          <button
            type="button"
            className="search-modal__close"
            aria-label="Close search"
            onClick={close}
          >
            <FiX />
          </button>
        </form>

        {showResults && text && (
          <div className="search-modal__results">
            {results.length === 0 ? (
              <p className="search-modal__empty">No products found</p>
            ) : (
              <ul className="search-modal__list">
                {results.slice(0, 8).map((product) => (
                  <li className="search-modal__item" key={product.id}>
                    <Link
                      to={`/products/${product.id}`}
                      className="search-modal__link"
                      onClick={handleSelect}
                    >
                      <span className="search-modal__image">
                        <img src={product.image} alt="" />
                      </span>
                      <span className="search-modal__name">{product.name}</span>
                      <span className="search-modal__price">
                        ${product.price}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
