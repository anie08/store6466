import ProductSection from "../productSection/ProductSection.jsx";
import "./SuggestedItems.scss";
const SuggestedItems = ({ title, filterKey }) => {
  return (
    <div className="suggested-items  ">
      <div className="suggested-items_content container">
        <div className="suggested-items_content_header">
          <h3 className="suggested-items_title">{title}</h3>
        </div>
        <div className="suggested-items_content_content">
          <ProductSection filterKey={filterKey} />
        </div>
      </div>
    </div>
  );
};

export default SuggestedItems;
