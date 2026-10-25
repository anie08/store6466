import { useCart } from "../../components/cartContext/CartContext.jsx";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.scss";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.jsx";
import CartProductActions from "../../components/cartProductActions/CartProductActions.jsx";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const tax = cart.length > 0 ? 50 : 0;
  const shipping = cart.length > 0 ? 29 : 0;
  const total = subtotal + tax + shipping;
  const navigate = useNavigate();

  return (
    <div className="container">
      <Breadcrumbs />
      <div className="cartPage ">
        <div className="cartPage__body">
          <h2 className="cartPage__body_header">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="cartPage__body_p">Your cart is empty</p>
          ) : (
            <div className="cart-products-list">
              {cart.map((item) => (
                <div
                  className="cart-product"
                  key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`}
                >
                  <div className={"cart-product-left"}>
                    <div className="cart-product_img-wrapper">
                      <img
                        className="cart-product_img-wrapper_img"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="cart-product-info">
                      <Link
                        to={`/products/${item.id}`}
                        className="cart-product-info_a"
                      >
                        <p className="cart-product-info_p">#{item.id}</p>
                        {(item.selectedColor || item.selectedStorage) && (
                          <div>
                            {item.selectedColor}
                            {item.selectedColor && item.selectedStorage
                              ? " / "
                              : ""}
                            {item.selectedStorage}
                          </div>
                        )}

                        <h3 className="cart-product-info_h3">{item.name}</h3>
                      </Link>
                    </div>
                  </div>
                  <CartProductActions item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="order-summary">
          <h2 className="order-summary-title">Order Summary</h2>

          <div className="order-summary-field">
            <label className="field-label" htmlFor="discount-code">
              <span className="label-text">Discount code / Promo code</span>
              <input
                id="discount-code"
                className="field-input"
                type="text"
                placeholder="Code"
              />
            </label>
          </div>

          <div className="order-summary-field">
            <label className="field-label" htmlFor="bonus-card">
              <span className="label-text">Your bonus card number</span>
              <div className="input-group">
                <input
                  id="bonus-card"
                  className="field-input input-group-input"
                  type="text"
                  placeholder="Enter Card Number"
                />
                <button className="button-apply" type="button">
                  Apply
                </button>
              </div>
            </label>
          </div>

          <div className="order-summary-prices">
            <div className="price-row price-subtotal">
              <span className="price-label">Subtotal</span>
              <span className="price-value">
                <strong>${subtotal.toFixed(2)}</strong>
              </span>
            </div>
            <div className="price-row">
              <span className="price-label">Estimated Tax</span>
              <span className="price-value">${tax.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span className="price-label">Estimated shipping & Handling</span>
              <span className="price-value">${shipping.toFixed(2)}</span>
            </div>
            <div className="price-row price-total">
              <span className="price-label">Total</span>
              <span className="price-value">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="button-checkout"
            type="button"
            disabled={cart.length === 0}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
