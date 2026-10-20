import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import Products from "./pages/products/Products.jsx";
import SummerSale from "./components/summerSale/SummerSale.jsx";
import Wishlist from "./pages/wishListContext/WishListContext.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import CartPage from "./pages/cartPage/CartPage.jsx";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
