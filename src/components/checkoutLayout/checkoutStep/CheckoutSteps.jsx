import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FiMapPin, FiTruck, FiCreditCard } from "react-icons/fi";
import "./CheckoutSteps.scss";

const CheckoutSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const isStep1 = pathname.includes("address") || pathname === "/checkout";
  const isStep2 = pathname.includes("shipping");
  const isStep3 = pathname.includes("payment");

  return (
    <div className="checkout-steps">
      <button
        type="button"
        className={classNames("checkout-steps__step", {
          "checkout-steps__step--active": isStep1,
        })}
        onClick={() => navigate("/checkout/address")}
      >
        <span className="checkout-steps__icon">
          <FiMapPin />
        </span>
        <span className="checkout-steps__text">
          <span className="checkout-steps__sub">Step 1</span>
          <span className="checkout-steps__title">Address</span>
        </span>
      </button>

      <button
        type="button"
        className={classNames("checkout-steps__step", {
          "checkout-steps__step--active": isStep2,
        })}
        onClick={() => navigate("/checkout/shipping")}
      >
        <span className="checkout-steps__icon">
          <FiTruck />
        </span>
        <span className="checkout-steps__text">
          <span className="checkout-steps__sub">Step 2</span>
          <span className="checkout-steps__title">Shipping</span>
        </span>
      </button>

      <button
        type="button"
        className={classNames("checkout-steps__step", {
          "checkout-steps__step--active": isStep3,
        })}
        onClick={() => navigate("/checkout/payment")}
      >
        <span className="checkout-steps__icon">
          <FiCreditCard />
        </span>
        <span className="checkout-steps__text">
          <span className="checkout-steps__sub">Step 3</span>
          <span className="checkout-steps__title">Payment</span>
        </span>
      </button>
    </div>
  );
};

export default CheckoutSteps;
