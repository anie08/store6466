import { Outlet } from "react-router-dom";
import CheckoutSteps from "./checkoutStep/CheckoutSteps.jsx";
import "./CheckoutLayout.scss";
const NAVIGATION = {
  address: {
    back: "/checkout",
    next: "/checkout/next",
  },
};

const CheckoutLayout = () => {


  return (
    <div className="checkout-layout">
      <div className="container">
        <CheckoutSteps />
        <div className="checkout-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default CheckoutLayout;
