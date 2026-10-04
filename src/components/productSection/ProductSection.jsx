import { initialProducts } from "../../data.js";
import "./ProductSection.scss";
import { useMemo } from "react";
import ProductItem from "../productItem/ProductItem.jsx";

const ProductSection = ({ filterKey }) => {
  const productList = useMemo(() => {
    return initialProducts.filter((elm) => {
      if (filterKey) {
        return elm[filterKey] === true;
      }
      return true;
    });
  }, [filterKey]);

  return (
    <div className="new-arrivals ">
      <div className="new-arrivals_content">
        {productList.map((elm) => {
          return <ProductItem key={elm.id} elm={elm} />;
        })}
      </div>
    </div>
  );
};

export default ProductSection;
