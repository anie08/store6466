import { initialProducts } from "../../data.js";
import { Link } from "react-router-dom";
import "./NewArrivals.scss";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const NewArrivals = () => {
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (id) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((item) => item !== id));
    } else {
      setLikedIds([...likedIds, id]);
    }
  };

  return (
    <div className="new-arrivals container">
      <div className="new-arrivals_header">
        <ul className="new-arrivals_header_list">
          <li className="new-arrivals_header_list_li new-arrivals_header_list_li--active">
            <a className="new-arrivals_header_link" href="#">
              New Arrival
            </a>
          </li>
          <li className="new-arrivals_header_list_li">
            <a className="new-arrivals_header_link" href="#">
              Bestseller
            </a>
          </li>
          <li className="new-arrivals_header_list_li">
            <a className="new-arrivals_header_link" href="#">
              Featured Products
            </a>
          </li>
        </ul>
      </div>

      <div className="new-arrivals_content">
        {initialProducts
          .filter((elm) => elm.isNewArrival === true)
          .map((elm) => {
            const isLiked = likedIds.includes(elm.id);

            return (
              <div className="new-arrivals_item" key={elm.id}>
                <div className="product-card">
                  <div className="product-card_top">
                    <button
                      className="product-card_heart"
                      onClick={() => toggleLike(elm.id)}
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

                  <h3 className="product-card_title">{elm.name}</h3>
                  <p className="product-card_price">${elm.price}</p>

                  <Link to={`/product/${elm.id}`} className="product-card_btn">
                    Buy Now
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewArrivals;
