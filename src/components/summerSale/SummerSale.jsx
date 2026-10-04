import { Link } from "react-router-dom";
import "./SummerSale.scss";
const SummerSale = () => {
  return (
    <div className="summer-summer">
      <div className="summer-summer__info">
        <div className="summer-summer__info__title">
          <h4 className="big-summer">
            Big Summer<span className="big-summer_span"> Sale</span>
          </h4>
          <p className="summer-summer__info__title_p">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>
        </div>
        <Link
          to="/products"
          className="heroAndProducts_left-side_button heroAndProducts_left-side_button_a"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default SummerSale;
