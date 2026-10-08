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
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.jsx";

const filters = [
  { title: "Brand", key: "brand" },
  { title: "Battery capacity", key: "batteryCapacity" },
  { title: "Screen type", key: "screenType" },
  { title: "Screen diagonal", key: "screenDiagonal" },
  { title: "Protection class", key: "protectionClass" },
  { title: "Built-in memory", key: "builtInMemory" },
];

const Products = () => {
  const [openFilter, setOpenFilter] = useState("brand");
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState({
    brand: ["Apple"],
  });

  const [sort, setSort] = useState("rating");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

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

  const products = initialProducts
    .filter((item) =>
      Object.keys(selected).every((key) => {
        const values = selected[key];

        return values.length === 0 || values.includes(item[key]);
      }),
    )
    .sort((a, b) => {
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

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
        <div className="products-sidebar">
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
                    value.toLowerCase().includes(search.toLowerCase()),
                  )
                : options;

            return (
              <div className="filter-box" key={filter.key}>
                <button
                  type="button"
                  className="filter-title"
                  onClick={() =>
                    setOpenFilter(openFilter === filter.key ? "" : filter.key)
                  }
                >
                  <span>{filter.title}</span>

                  {openFilter === filter.key ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>

                {openFilter === filter.key && (
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
        </div>

        <div className="products-right">
          <div className="products-top">
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
