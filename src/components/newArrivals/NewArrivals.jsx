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
    <div className="New-arrivals container">
      <div className="New-arrivals_header">
        <ul className="New-arrivals_header_list">
          <li className="New-arrivals_header_list_li">
            <a href="#">New Arrival</a>
          </li>
          <li className="New-arrivals_header_list_li">
            <a href="#">Bestseller</a>
          </li>
          <li className="New-arrivals_header_list_li">
            <a href="#">Featured Products</a>
          </li>
        </ul>
      </div>

      <div className="New-arrivals_content">
        {initialProducts
          .filter((elm) => elm.isNewArrival === true)
          .map((elm) => {
            const isLiked = likedIds.includes(elm.id);

            return (
              <div className="New-arrivals_item" key={elm.id}>
                <div className="product-card">
                  <button
                    className="heart-btn"
                    onClick={() => toggleLike(elm.id)}
                  >
                    {isLiked ? (
                      <FaHeart style={{ color: "red", fontSize: "24px" }} />
                    ) : (
                      <FaRegHeart style={{ color: "#000", fontSize: "24px" }} />
                    )}
                  </button>

                  <img src={elm.image} alt={elm.name} />
                  <h3>{elm.name}</h3>
                  <p>${elm.price}</p>
                  <Link to={`/product/${elm.id}`} className="view-btn">
                    View Details
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
