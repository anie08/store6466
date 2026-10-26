import { useOutletContext } from "react-router-dom";
import { useCart } from "../../components/cartContext/CartContext.jsx";
import "./Payment.scss";
const PaymentStep = () => {
  const { cart } = useCart();
  const { address, shipping } = useOutletContext();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = 50;
  const shippingCost = shipping?.price ?? 0;
  const total = subtotal + tax + shippingCost;

  return (
    <div className="payment-step">
      <div className="payment-step__summary container">
        <h3 className="payment-step__summary__title">Summary</h3>
        <div className="payment-step__items">
          {cart.map((item) => (
            <div
              className="payment-step__item"
              key={`${item.id} - ${item.selectedColor} - ${item.selectedStorage}`}
            >
              <div className="payment-step__item-img">
                <img src={item.image} alt={item.name} />
              </div>
              <span className="payment-step__item-name">{item.name}</span>
              <span className="payment-step__item-price">
                ${item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className="payment-step__info">
          <p className="payment-step__label">Address</p>
          <p className="payment-step__value">{address?.address}</p>
        </div>

        <div className="payment-step__info">
          <p className="payment-step__label">Shipment method</p>
          <p className="payment-step__value">{shipping?.title}</p>
        </div>

        <div className="payment-step__prices">
          <div className="payment-step__price-row payment-step__price-row--bold">
            <span className="payment-step__price-label">Subtotal</span>
            <span className="payment-step__price-value">${subtotal}</span>
          </div>
          <div className="payment-step__price-row ">
            <span className="payment-step__price-label">Estimated Tax</span>
            <span className="payment-step__price-value">${tax}</span>
          </div>
          <div className="payment-step__price-row ">
            <span className="payment-step__price-label">
              Estimated shipping & Handling
            </span>
            <span className="payment-step__price-value">${shippingCost}</span>
          </div>
          <div className="payment-step__price-row payment-step__price-row--bold">
            <span className="payment-step__price-label">Total</span>
            <span className="payment-step__price-value">${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
