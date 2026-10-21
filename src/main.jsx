import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/Style.scss";
import App from "./App.jsx";
import CartProvider from "../src/components/cartContext/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>,
);
