import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import classNames from "classnames";
import { useCart } from "../cartContext/CartContext.jsx";
import "./CartProductActions.scss";

const CartProductActions = ({ item, showSum = true, variant }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, selectedColor, selectedStorage, quantity, price } = item;

  return (
    <div
      className={classNames("cart-product-right", {
        "cart-product-right--details": variant === "details",
      })}
    >
      <div
        className={classNames("cart-product-quantity", {
          "cart-product-quantity--details": variant === "details",
        })}
      >
        <button
          type="button"
          className="cart-product__quantity-button"
          aria-label="Decrease quantity"
          onClick={() => updateQuantity(id, selectedColor, selectedStorage, -1)}
        >
          <FiMinus />
        </button>
        <span className="cart-product-quantity_quantity">
          <input
            type="number"
            min="1"
            aria-label="Quantity"
            value={quantity}
            onChange={(e) => {
              const newQuantity = Number(e.target.value);
              if (newQuantity >= 1) {
                updateQuantity(
                  id,
                  selectedColor,
                  selectedStorage,
                  newQuantity - quantity,
                );
              }
            }}
          />
        </span>
        <button
          type="button"
          className="cart-product__quantity-button"
          aria-label="Increase quantity"
          onClick={() => updateQuantity(id, selectedColor, selectedStorage, 1)}
        >
          <FiPlus />
        </button>
      </div>

      {showSum && (
        <strong className="cart-product-sum">
          ${(price * quantity).toFixed(2)}
        </strong>
      )}

      <button
        type="button"
        className="cart-product-remove"
        aria-label="Remove from cart"
        onClick={() => removeFromCart(id, selectedColor, selectedStorage)}
      >
        <FiX />
      </button>
    </div>
  );
};

export default CartProductActions;
