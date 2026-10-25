import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initialProducts } from "../../data.js";
import { useWishlist } from "../../components/wishlistContext/WishlistContext.jsx";
import RatingSystem from "../../components/ratingSystem/RatingSystem.jsx";
import SuggestedItems from "../../components/suggestedItems/SuggestedItems.jsx";
import { useCart } from "../../components/cartContext/CartContext.jsx";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.jsx";
import CartProductActions from "../../components/cartProductActions/CartProductActions.jsx";

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
  const product = initialProducts.find((elm) => elm.id === Number(id));

  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist(product?.id);
  const [selectedColor, setSelectedColor] = useState(
    product?.selectedColor || "",
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product?.builtInMemory || "",
  );
  const [activeImage, setActiveImage] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedColor(product?.selectedColor || "");
    setSelectedStorage(product?.builtInMemory || "");
    setActiveImage(0);
  }, [id]);

  if (!product) {
    return <div className="container">Product not found</div>;
  }
  const cartColor = selectedColor || product.selectedColor || "";
  const cartStorage = selectedStorage || product.builtInMemory || "";

  const cartItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.selectedColor === cartColor &&
      item.selectedStorage === cartStorage,
  );
  const images = product.images?.length ? product.images : [product.image];

  console.log(images);

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
  ].filter(([, value]) => value != null && value !== "N/A");

  const cpuDetails = [
    ["CPU", product.cpu],
    ["Number of cores", product.cores],
    ["Built-in memory", product.builtInMemory],
    ["Protection class", product.protectionClass],
  ].filter(([, value]) => value != null && value !== "N/A");

  return (
    <div className="product-details-wraper container">
      <Breadcrumbs lastLabel={product.name} />
      <div className="product-details ">
        <div className="product-details_image">
          <div className="product-details_side-photos">
            {images.map((image, index) => (
              <button
                type="button"
                key={index}
                className={classNames("product-details_thumb", {
                  active: activeImage === index,
                })}
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
          <h1 className="product-details_info_h1">{product.name}</h1>

          <div className="product-details_prices">
            <h2 className="product-details_prices_price">${product.price}</h2>
            <del className="product-details_prices_del">
              ${product.oldPrice}
            </del>
          </div>

          {product.colors?.length > 0 && (
            <div className="product-details_colors">
              <span className="product-details_colors_color-header">
                Select color:
              </span>

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
                  className={classNames("product-details_button", {
                    active: selectedStorage === storage,
                  })}
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
                  <small className="product-details_spec_label">
                    {item.label}
                  </small>
                  <p className="product-details_spec_value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="product-details_description">{product.description}</p>

          <div className="product-details_buttons">
            <button
              type="button"
              aria-pressed={isLiked}
              className={classNames(
                "wishlist-btn product-details_buttons_button",
                {
                  "  product-details_buttons_button--liked": isLiked,
                },
              )}
              onClick={() => toggleWishlist(product)}
            >
              {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            {cartItem ? (
              <CartProductActions
                item={cartItem}
                showSum={false}
                variant="details"
              />
            ) : (
              <button
                type="button"
                className="cart-btn product-details_buttons_button"
                onClick={() =>
                  addToCart(
                    product,
                    selectedColor,
                    selectedStorage,
                    images[activeImage],
                  )
                }
              >
                Add to Cart
              </button>
            )}
          </div>

          <div className="product-details_services">
            {product.delivery && (
              <div className="service-item">
                <FaTruck />
                <div>
                  <small className="service-item_header">Free Delivery</small>
                  <p className="service-item_count">{product.delivery}</p>
                </div>
              </div>
            )}

            {product.stockStatus && (
              <div className="service-item">
                <FaStore />
                <div>
                  <small className="service-item_header">In Stock</small>
                  <p className="service-item_count">{product.stockStatus}</p>
                </div>
              </div>
            )}

            {product.warranty && (
              <div className="service-item">
                <FaShieldAlt />
                <div>
                  <small className="service-item_header">Guaranteed</small>
                  <p className="service-item_count">{product.warranty}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="product-details-bottom">
        <div className="container">
          <div className="product-details-card">
            <h2 className="product-details-card_h2">Details</h2>

            <p className="details-description">{product.description}</p>

            {screenDetails.length > 0 && (
              <div className="details-section">
                <h3 className="details-section_h3">Screen</h3>

                {screenDetails.map(([label, value]) => (
                  <div className="details-row" key={label}>
                    <span className="details-row_label">{label}</span>
                    <span className="details-row_label details-row_label--bold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {cpuDetails.length > 0 && (
              <div className="details-section">
                <h3 className="details-section_h3">CPU</h3>

                {cpuDetails.map(([label, value]) => (
                  <div className="details-row" key={label}>
                    <span className="details-row_label">{label}</span>
                    <span className="details-row_label details-row_label--bold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {showMore && (
              <>
                {product.mainCamera && product.mainCamera !== "N/A" && (
                  <div className="details-section">
                    <h3 className="details-section_h3">Camera</h3>

                    <div className="details-row">
                      <span className="details-row_label">Main camera</span>
                      <span className="details-row_label details-row_label--bold">
                        {product.mainCamera}
                      </span>
                    </div>

                    {product.frontCamera && product.frontCamera !== "N/A" && (
                      <div className="details-row">
                        <span className="details-row_label">Front camera</span>
                        <span className="details-row_label details-row_label--bold">
                          {product.frontCamera}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="details-section">
                  <h3 className="details-section_h3">Additional information</h3>

                  {product.battery && (
                    <div className="details-row">
                      <span className="details-row_label">Battery</span>
                      <span className="details-row_label details-row_label--bold">
                        {product.battery}
                      </span>
                    </div>
                  )}

                  <div className="details-row">
                    <span className="details-row_label">Brand</span>
                    <span className="details-row_label details-row_label--bold">
                      {product.brand}
                    </span>
                  </div>

                  <div className="details-row">
                    <span className="details-row_label">Category</span>
                    <span className="details-row_label details-row_label--bold">
                      {product.category}
                    </span>
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
