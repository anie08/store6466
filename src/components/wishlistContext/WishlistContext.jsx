import { createContext, useState, useContext, useEffect } from "react";

const wishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );
  };

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(wishlistContext);
