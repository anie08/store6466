import React, { createContext, useState, useContext, useEffect } from "react";

const cartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("shop_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("shop_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product,
    selectedColor,
    selectedStorage,
    selectedImage,
    quantity = 1,
  ) => {
    const finalImage = selectedImage || product.image;
    const finalColor = selectedColor || product.selectedColor || "";
    const finalStorage = selectedStorage || product.builtInMemory || "";

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === finalColor &&
          item.selectedStorage === finalStorage,
      );

      if (existingIndex !== -1) {
        const newCart = [...prev];

        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };

        return newCart;
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: finalImage,
          selectedColor: finalColor,
          selectedStorage: finalStorage,
          quantity: quantity,
        },
      ];
    });
  };

  const removeFromCart = (id, selectedColor, selectedStorage) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor &&
            item.selectedStorage === selectedStorage
          ),
      ),
    );
  };
  const updateQuantity = (id, selectedColor, selectedStorage, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export const useCart = () => useContext(cartContext);
