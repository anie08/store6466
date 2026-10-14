export const handleLike = (elm, setIsLiked, onWishlistChange) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  const exists = wishlist.some((item) => item.id === elm.id);

  const updatedWishlist = exists
    ? wishlist.filter((item) => item.id !== elm.id)
    : [...wishlist, elm];

  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

  setIsLiked(!exists);
  onWishlistChange?.();
};
