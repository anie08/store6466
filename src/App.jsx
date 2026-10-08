import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import Products from "./pages/products/Products.jsx";
import SummerSale from "./components/summerSale/SummerSale.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/iphone" element={<SummerSale />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
