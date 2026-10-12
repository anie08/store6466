import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import ProductItem from "../../components/productItem/ProductItem.jsx";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.jsx";
import "./WishListContext.scss";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist") || "[]"),
  );

  const updateWishlist = () => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <Breadcrumbs />

        <h1 className="wishlist-title">My Wishlist ({wishlist.length})</h1>

        {wishlist.length > 0 ? (
          <div className="wishlist-products">
            {wishlist.map((elm) => (
              <ProductItem
                key={elm.id}
                elm={elm}
                onWishlistChange={updateWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <FaRegHeart />

            <h2>Your wishlist is empty</h2>
            <p>Save your favorite products here.</p>

            <Link to="/products">Explore Products</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
