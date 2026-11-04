import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { initialProducts } from "../../data.js";
import "./HeaderSearch.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchModal from "../../searchModal/SearchModal.jsx";
const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [backdropTop, setBackdropTop] = useState(0);
  const text = query.trim().toLowerCase();
  const results = text
    ? initialProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(text) ||
          product.brand?.toLowerCase().includes(text) ||
          product.category?.toLowerCase().includes(text),
      )
    : [];

  const close = () => setIsOpen(false);

  const open = () => {
    const header = document.querySelector(".header");
    setBackdropTop(header ? header.getBoundingClientRect().bottom : 0);
    setIsOpen(true);
  };
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleSelect = () => {
    setQuery("");
    close();
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading
    if (results.length > 0) {
      navigate(`/products/${results[0].id}`); // open the first result
      setQuery("");
      close();
    }
  };

  return (
    <>
      <div className="header-search__wrapper">
        <div className="header-search">
          <span className="header-search__icon">
            <CiSearch />
          </span>

          <form
            className="header-search__field"
            role="search"
            onSubmit={handleSubmit}
          >
            {" "}
            <input
              type="search"
              placeholder="Search"
              aria-label="Search products"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                open();
              }}
              onFocus={open}
            />
          </form>

          {isOpen && (
            <div className="header-search__panel">
              {!text && (
                <p className="header-search__hint">Start typing to search…</p>
              )}

              {text && results.length === 0 && (
                <p className="header-search__hint">No products found</p>
              )}

              {results.length > 0 && (
                <ul className="header-search__list">
                  {results.slice(0, 8).map((product) => (
                    <li className="header-search__item" key={product.id}>
                      <Link
                        to={`/products/${product.id}`}
                        className="header-search__link"
                        onClick={handleSelect}
                      >
                        <span className="header-search__image">
                          <img src={product.image} alt="" />
                        </span>
                        <span className="header-search__name">
                          {product.name}
                        </span>
                        <span className="header-search__price">
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
        {/*<SearchModal onClose={() => console.log(2)} />*/}
      </div>

      {isOpen && (
        <div
          className="header-search__backdrop"
          style={{ top: backdropTop }}
          onClick={close}
        ></div>
      )}
    </>
  );
};

export default HeaderSearch;
