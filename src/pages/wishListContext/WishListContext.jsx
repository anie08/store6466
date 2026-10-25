import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import ProductItem from "../../components/productItem/ProductItem.jsx";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.jsx";
import { useWishlist } from "../../components/wishlistContext/WishlistContext.jsx";
import "./WishListContext.scss";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <div className="container">
        <Breadcrumbs />

        <h1 className="wishlist-title">My Wishlist ({wishlist.length})</h1>

        {wishlist.length > 0 ? (
          <div className="wishlist-products">
            {wishlist.map((elm) => (
              <ProductItem key={elm.id} elm={elm} />
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <FaRegHeart />

            <h2 className="wishlist-empty_h2">Your wishlist is empty</h2>
            <p className="wishlist-empty_p">
              Save your favorite products here.
            </p>

            <Link className="wishlist-empty_a" to="/products">
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
