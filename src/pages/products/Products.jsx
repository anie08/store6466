import { useState } from "react";
import { initialProducts } from "../../data.js";
import ProductItem from "../../components/productItem/ProductItem.jsx";
import {
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";
import "./Products.scss";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.jsx";

const filters = [
  { title: "Brand", key: "brand" },
  { title: "Battery capacity", key: "batteryCapacity" },
  { title: "Screen type", key: "screenType" },
  { title: "Screen diagonal", key: "screenDiagonal" },
  { title: "Protection class", key: "protectionClass" },
  { title: "Built-in memory", key: "builtInMemory" },
];

const prices = initialProducts.map((item) => Number(item.price));
const minimumPrice = Math.floor(Math.min(...prices));
const maximumPrice = Math.ceil(Math.max(...prices));

const Products = () => {
  const [openFilter, setOpenFilter] = useState([
    "price",
    "brand",
    "builtInMemory",
  ]);
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selected, setSelected] = useState({
    brand: ["Apple"],
  });
  const [minPrice, setMinPrice] = useState(minimumPrice);
  const [maxPrice, setMaxPrice] = useState(maximumPrice);
  const [sort, setSort] = useState("rating");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  const toggleFilter = (key) => {
    setOpenFilter((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const changeFilter = (key, value) => {
    const values = selected[key] || [];

    setSelected({
      ...selected,
      [key]: values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    });

    setPage(1);
  };

  const changeMinPrice = (value) => {
    const number = Number(value);

    setMinPrice(Math.max(minimumPrice, Math.min(number, maxPrice)));
    setPage(1);
  };

  const changeMaxPrice = (value) => {
    const number = Number(value);

    setMaxPrice(Math.min(maximumPrice, Math.max(number, minPrice)));
    setPage(1);
  };

  const products = initialProducts
    .filter((item) => {
      const matchesFilters = Object.keys(selected).every((key) => {
        const values = selected[key];

        return values.length === 0 || values.includes(item[key]);
      });

      const matchesPrice =
        Number(item.price) >= minPrice && Number(item.price) <= maxPrice;

      return matchesFilters && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  const perPage = 9;
  const totalPages = Math.ceil(products.length / perPage);

  const visibleProducts = products.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="products-page">
      <Breadcrumbs />

      <div className="products-layout container">
        <div
          className={`products-sidebar ${
            mobileFiltersOpen ? "mobile-open" : ""
          }`}
        >
          <div className="mobile-filter-header">
            <button type="button" onClick={() => setMobileFiltersOpen(false)}>
              <FaChevronLeft />
            </button>
            <h2>Filters</h2>
          </div>

          <div className="filter-box price-filter">
            {" "}
            <button
              type="button"
              className="filter-title"
              onClick={() => toggleFilter("price")}
            >
              <span>Price</span>
              {openFilter.includes("price") ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>
            {openFilter.includes("price") && (
              <div className="filter-body">
                <div className="price-inputs">
                  <label>
                    From
                    <input
                      type="number"
                      min={minimumPrice}
                      max={maxPrice}
                      value={minPrice}
                      onChange={(e) => changeMinPrice(e.target.value)}
                    />
                  </label>

                  <span>—</span>

                  <label>
                    To
                    <input
                      type="number"
                      min={minPrice}
                      max={maximumPrice}
                      value={maxPrice}
                      onChange={(e) => changeMaxPrice(e.target.value)}
                    />
                  </label>
                </div>

                <div className="price-range">
                  <input
                    type="range"
                    min={minimumPrice}
                    max={maximumPrice}
                    value={minPrice}
                    onChange={(e) => changeMinPrice(e.target.value)}
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min={minimumPrice}
                    max={maximumPrice}
                    value={maxPrice}
                    onChange={(e) => changeMaxPrice(e.target.value)}
                    aria-label="Maximum price"
                  />
                </div>
              </div>
            )}
          </div>

          {filters.map((filter) => {
            const options = [
              ...new Set(
                initialProducts
                  .map((item) => item[filter.key])
                  .filter((value) => value != null),
              ),
            ];

            const shownOptions =
              filter.key === "brand"
                ? options.filter((value) =>
                    String(value).toLowerCase().includes(search.toLowerCase()),
                  )
                : options;

            return (
              <div className="filter-box" key={filter.key}>
                <button
                  type="button"
                  className="filter-title"
                  onClick={() => toggleFilter(filter.key)}
                >
                  <span>{filter.title}</span>

                  {openFilter.includes(filter.key) ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>

                {openFilter.includes(filter.key) && (
                  <div className="filter-body">
                    {filter.key === "brand" && (
                      <div className="brand-search">
                        <FaSearch />
                        <input
                          type="text"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    )}

                    {shownOptions.map((value) => (
                      <label className="filter-option" key={value}>
                        <input
                          type="checkbox"
                          checked={
                            selected[filter.key]?.includes(value) || false
                          }
                          onChange={() => changeFilter(filter.key, value)}
                        />

                        <span>
                          {value}
                          {filter.key === "batteryCapacity" && " mAh"}
                          {filter.key === "screenDiagonal" && '"'}
                        </span>

                        <small>
                          {
                            initialProducts.filter(
                              (item) => item[filter.key] === value,
                            ).length
                          }
                        </small>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mobile-filter-footer">
            <button
              type="button"
              className="apply-filter-btn"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>

        <div className="products-right">
          <div className="products-top">
            <button
              type="button"
              className="mobile-filter-btn"
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
              <FaChevronDown />
            </button>

            <p>
              Selected Products:
              <strong> {products.length}</strong>
            </p>

            <div className="sort-box">
              <button
                type="button"
                className="sort-button"
                onClick={() => setSortOpen(!sortOpen)}
              >
                {sort === "rating"
                  ? "By rating"
                  : sort === "low"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
                <FaChevronDown />
              </button>

              {sortOpen && (
                <div className="sort-options">
                  <button
                    type="button"
                    onClick={() => {
                      setSort("rating");
                      setSortOpen(false);
                      setPage(1);
                    }}
                  >
                    By rating
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSort("low");
                      setSortOpen(false);
                      setPage(1);
                    }}
                  >
                    Price: Low to High
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSort("high");
                      setSortOpen(false);
                      setPage(1);
                    }}
                  >
                    Price: High to Low
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="products-cards">
            {visibleProducts.map((elm) => (
              <ProductItem key={elm.id} elm={elm} />
            ))}
          </div>

          {products.length === 0 && (
            <p className="no-products">No products found</p>
          )}

          {totalPages > 1 && (
            <div className="products-pages">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    type="button"
                    key={number}
                    className={page === number ? "active" : ""}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
