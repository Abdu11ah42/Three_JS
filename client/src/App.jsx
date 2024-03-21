import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import CartPage from "./pages/Cartpage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState([]);
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1); // Remove item at the specified index

      // Update local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
    toast.info("Item has been removed from Cart", { position: "top-left" });
  };

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <>
      <ToastContainer style={{ textTransform: "capitalize" }} />
      <Router>
        <main className="app transition-all ease-in">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Canvas />
                </>
              }
            />
            <Route
              path="/product"
              element={
                <>
                  <Customizer cart={cart} setCart={setCart} />
                  <Canvas />
                </>
              }
            />

            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  setCart={setCart}
                  removeFromCart={removeFromCart}
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
