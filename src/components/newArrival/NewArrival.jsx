import ProductSection from "../productSection/ProductSection.jsx";
import "./NewArrival.scss";
const NewArrival = ({ filterKey }) => {
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
      <ProductSection filterKey={filterKey} />
    </div>
  );
};

export default NewArrival;
