// AddToCartButton.js
import React from "react";

const AddToCartButton = ({ id }) => {
  const handleClick = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // Expires in 7 days
    document.cookie = `cartItem=${id};expires=${expires.toUTCString()};path=/`;
  };
  return (
    <button
      className="p-2 mt-3"
      style={{ backgroundColor: "black", color: "white" }}
      onClick={handleClick}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
