import { initialProducts } from "../../data.js";
import { Link } from "react-router-dom";
import "./Popular.scss";

const Popular = () => {
  return (
    <section className="popular">
      {initialProducts
        .filter((elm) => elm.isPopular)
        .reverse()
        .map((elm, index) => (
          <div
            className={`popular_card popular_card--${index + 1}`}
            key={elm.id}
          >
            <div className="popular_img-box">
              <img className="popular_img" src={elm.image} alt={elm.name} />
            </div>
            <div className="popular_info">
              <h3 className="popular_title">{elm.name}</h3>
              <p className="popular_desc">{elm.description}</p>
              <Link to={`/product/${elm.id}`} className="popular_btn">
                Shop Now
              </Link>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Popular;
