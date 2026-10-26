import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "./checkoutStep/CheckoutSteps.jsx";
import "./CheckoutLayout.scss";

const CHECKOUT_NAVIGATION = {
  address: {
    back: "/cart",
    next: "/checkout/shipping",
  },
  shipping: {
    back: "/checkout/address",
    next: "/checkout/payment",
  },
};

const CheckoutLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [canGoNext, setCanGoNext] = useState(true);

  const step = pathname.split("/").pop();
  const paths = CHECKOUT_NAVIGATION[step];
  const [address, setAddress] = useState(null);
  const [shipping, setShipping] = useState(null);

  return (
    <div className="checkout-layout">
      <div className="container">
        <CheckoutSteps />

        <div className="checkout-layout__content">
          <Outlet
            context={{
              setCanGoNext,
              address,
              setAddress,
              shipping,
              setShipping,
            }}
          />
        </div>

        {paths && (
          <div className="checkout-layout__actions">
            <button
              type="button"
              className="checkout-btn checkout-btn--outline"
              onClick={() => navigate(paths.back)}
            >
              Back
            </button>
            <button
              type="button"
              className="checkout-btn checkout-btn--primary"
              disabled={!canGoNext}
              onClick={() => navigate(paths.next)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutLayout;
