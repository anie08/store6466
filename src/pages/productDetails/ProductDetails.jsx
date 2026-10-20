import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initialProducts } from "../../data.js";
import { handleLike } from "../../components/handleLike/handleLike.jsx";
import RatingSystem from "../../components/ratingSystem/RatingSystem.jsx";
import SuggestedItems from "../../components/suggestedItems/SuggestedItems.jsx";
import { useCart } from "../../components/cartContext/CartContext.jsx";
import {
  FaMobileAlt,
  FaMicrochip,
  FaCamera,
  FaBatteryFull,
  FaTruck,
  FaStore,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./ProductDetails.scss";
import classNames from "classnames";

const colorCodes = {
  "Deep Purple": "#5b4676",
  "Space Black": "#242424",
  Black: "#111111",
  "Phantom Black": "#222222",
  Silver: "#d6d6d6",
  Gold: "#e3b94c",
  White: "#f2f2f2",
  Pink: "#f4b9c7",
  Red: "#d90016",
  Green: "#66836b",
  Blue: "#6b9fc4",
  "Sky Blue": "#86b7db",
  Yellow: "#f1d34f",
  Starlight: "#e7dfd1",
  Midnight: "#30384b",
  Graphite: "#565656",
  Cream: "#f0e6cf",
  "Icy Blue": "#c5dce8",
  Graygreen: "#828b82",
  Beige: "#d9c7aa",
  "Space Gray": "#777777",
};

const ProductDetails = () => {
  const { id } = useParams();
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  const product = initialProducts.find((elm) => elm.id === Number(id));

  const [isLiked, setIsLiked] = useState(
    savedWishlist.some((item) => item.id === product.id),
  );

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.selectedColor || "",
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.builtInMemory || "",
  );
  const [showMore, setShowMore] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  const images = product.images.length ? product.images : [product.image];

  const specifications = [
    {
      icon: <FaMobileAlt />,
      label: "Screen size",
      value: product.screenSize,
    },
    {
      icon: <FaMicrochip />,
      label: "CPU",
      value: product.cpu,
    },
    {
      icon: <FaMicrochip />,
      label: "Number of Cores",
      value: product.cores,
    },
    {
      icon: <FaCamera />,
      label: "Main camera",
      value: product.mainCamera,
    },
    {
      icon: <FaCamera />,
      label: "Front camera",
      value: product.frontCamera,
    },
    {
      icon: <FaBatteryFull />,
      label: "Battery capacity",
      value: product.battery,
    },
  ].filter((item) => item.value != null && item.value !== "N/A");

  const screenDetails = [
    ["Screen diagonal", product.screenSize],
    ["Screen resolution", product.screenResolution],
    ["Screen refresh rate", product.screenRefreshRate],
    ["Pixel density", product.pixelDensity],
    ["Screen type", product.screenType],
    ["Additionally", product.screenFeatures],
  ].filter((item, index) => item[index] != null && item[index] !== "N/A");

  const cpuDetails = [
    ["CPU", product.cpu],
    ["Number of cores", product.cores],
    ["Built-in memory", product.builtInMemory],
    ["Protection class", product.protectionClass],
  ].filter((item, index) => item[index] != null && item[index] !== "N/A");

  return (
    <div className="product-details-wraper">
      <div className="product-details container">
        <div className="product-details_image">
          <div className="product-details_side-photos">
            {images.map((image, index) => (
              <button
                type="button"
                key={index}
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={product.name} />
              </button>
            ))}
          </div>

          <div className="product-details_main-image">
            <img src={images[activeImage]} alt={product.name} />
          </div>
        </div>

        <div className="product-details_info">
          <h1>{product.name}</h1>

          <div className="product-details_prices">
            <h2>${product.price}</h2>
            <del>${product.oldPrice}</del>
          </div>

          {product.colors.length > 0 && (
            <div className="product-details_colors">
              <span>Select color:</span>

              <div className="product-details_color-options">
                {product.colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    title={color}
                    aria-label={color}
                    className={classNames("product-details_color-button", {
                      active: selectedColor === color,
                    })}
                    style={{
                      backgroundColor: colorCodes[color] || color,
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {product.storageOptions?.length > 0 && (
            <div className="product-details_storage">
              {product.storageOptions.map((storage) => (
                <button
                  type="button"
                  key={storage}
                  className={selectedStorage === storage ? "active" : ""}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </button>
              ))}
            </div>
          )}

          <div className="product-details_specs">
            {specifications.map((item) => (
              <div className="product-details_spec" key={item.label}>
                <span className="spec-icon">{item.icon}</span>
                <div>
                  <small>{item.label}</small>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="product-details_description">{product.description}</p>

          <div className="product-details_buttons">
            <button
              type="button"
              className="wishlist-btn"
              onClick={() => handleLike(product, setIsLiked)}
            >
              {isLiked && "liked"}
              Add to Wishlist
            </button>

            <button
              type="button"
              className="cart-btn"
              onClick={() =>
                addToCart(
                  product,
                  selectedColor,
                  selectedStorage,
                  images[activeImage],
                  1,
                )
              }
            >
              Add to Cart
            </button>
          </div>

          <div className="product-details_services">
            {product.delivery && (
              <div className="service-item">
                <FaTruck />
                <div>
                  <small>Free Delivery</small>
                  <p>{product.delivery}</p>
                </div>
              </div>
            )}

            {product.stockStatus && (
              <div className="service-item">
                <FaStore />
                <div>
                  <small>In Stock</small>
                  <p>{product.stockStatus}</p>
                </div>
              </div>
            )}

            {product.warranty && (
              <div className="service-item">
                <FaShieldAlt />
                <div>
                  <small>Guaranteed</small>
                  <p>{product.warranty}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="product-details-bottom">
        <div className="container">
          <div className="product-details-card">
            <h2>Details</h2>

            <p className="details-description">{product.description}</p>

            {screenDetails.length > 0 && (
              <div className="details-section">
                <h3>Screen</h3>

                {screenDetails.map(([label, value]) => (
                  <div className="details-row" key={label}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {cpuDetails.length > 0 && (
              <div className="details-section">
                <h3>CPU</h3>

                {cpuDetails.map(([label, value]) => (
                  <div className="details-row" key={label}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {showMore && (
              <>
                {product.mainCamera && product.mainCamera !== "N/A" && (
                  <div className="details-section">
                    <h3>Camera</h3>

                    <div className="details-row">
                      <span>Main camera</span>
                      <span>{product.mainCamera}</span>
                    </div>

                    {product.frontCamera && product.frontCamera !== "N/A" && (
                      <div className="details-row">
                        <span>Front camera</span>
                        <span>{product.frontCamera}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="details-section">
                  <h3>Additional information</h3>

                  {product.battery && (
                    <div className="details-row">
                      <span>Battery</span>
                      <span>{product.battery}</span>
                    </div>
                  )}

                  <div className="details-row">
                    <span>Brand</span>
                    <span>{product.brand}</span>
                  </div>

                  <div className="details-row">
                    <span>Category</span>
                    <span>{product.category}</span>
                  </div>
                </div>
              </>
            )}

            <button
              type="button"
              className="details-view-more"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "View Less" : "View More"}

              {showMore ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
      </div>
      <RatingSystem />
      <SuggestedItems title="Related Products" filterKey="isDiscounted" />
    </div>
  );
};

export default ProductDetails;
