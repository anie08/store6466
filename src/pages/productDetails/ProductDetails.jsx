import { useParams } from "react-router-dom";
import { initialProducts } from "../../data.js";
const ProductDetails = () => {
  const { id } = useParams();
  const product = initialProducts.find((elm) => elm.id === Number(id));
  return (
    <div className="product-details-wraper">
      <div className="product-details container">
        <div className="product-details_image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details_info">
          <h1>{product.name}</h1>

          <h2>${product.price}</h2>
          <del>${product.oldPrice}</del>

          <p>{product.description}</p>

          <h3>Specifications</h3>

          <p>Screen: {product.screenSize}</p>
          <p>CPU: {product.cpu}</p>
          <p>Cores: {product.cores}</p>
          <p>Camera: {product.mainCamera}</p>
          <p>Battery: {product.battery}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
