import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import Products from "./pages/products/Products.jsx";
import SummerSale from "./components/summerSale/SummerSale.jsx";
import Wishlist from "./pages/wishListContext/WishListContext.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import CartPage from "./pages/cartPage/CartPage.jsx";
import AddAdress from "./pages/addAdress/AddAdress.jsx";
import CheckoutLayout from "./components/checkoutLayout/CheckoutLayout.jsx";
import ShippingStep from "./pages/shippingStep/ShippingStep.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/iphone" element={<SummerSale />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutLayout />}>
            <Route index element={<Navigate to="address" replace />} />
            <Route path="address" element={<AddAdress />} />
            <Route path="shipping" element={<ShippingStep />} />
            {/*<Route path="payment" element={<PaymentStep />} />*/}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
