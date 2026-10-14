import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { memo, useState } from "react";
import "./ProductItem.scss";
import { handleLike } from "../handleLike/HandleLike.jsx";

const ProductItem = ({ elm, onWishlistChange }) => {
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  const [isLiked, setIsLiked] = useState(
    savedWishlist.some((item) => item.id === elm.id),
  );

  return (
    <div className="new-arrivals_item">
      <div className="product-card">
        <div className="product-card_top-wrapper">
          <div className="product-card_top">
            <button
              type="button"
              className="product-card_heart"
              onClick={() => handleLike(elm, setIsLiked, onWishlistChange)}
            >
              {isLiked ? (
                <FaHeart className="product-card_heart_icon product-card_heart_icon--liked" />
              ) : (
                <FaRegHeart className="product-card_heart_icon" />
              )}
            </button>
          </div>

          <div className="product-card_img">
            <img
              className="product-card_img_el"
              src={elm.image}
              alt={elm.name}
            />
          </div>
        </div>

        <div className="product-card_bottom-wrapper">
          <div className="product-card_content">
            <h3 className="product-card_title">{elm.name}</h3>
            <p className="product-card_price">${elm.price}</p>
          </div>

          <Link to={`/products/${elm.id}`} className="product-card_btn">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItem);
