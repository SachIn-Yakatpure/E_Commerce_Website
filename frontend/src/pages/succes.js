
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../actions/cartActions";
import { Link } from "react-router-dom";

export default function Success({ setShouldLoadCart }) {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(clearCart());

      if (setShouldLoadCart) {
    setShouldLoadCart(false);
  }
    
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem('cartItems'));
      console.log("🛒 LocalStorage cartItems after clear:", cart);
    }, 500);
  }, [dispatch, setShouldLoadCart]);

  console.log("Cart should now be cleared");


  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh", textAlign: "center", padding: "2rem" }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        alt="Success"
        style={{ width: "100px", height: "100px", marginBottom: "20px" }}
      />
      <h1 className="text-success">✅ Payment Successful!</h1>
      <p className="mt-3" style={{ fontSize: "18px", maxWidth: "500px" }}>
        Thank you for your purchase! Your order has been placed and will be processed shortly.
      </p>
      <Link to="/" className="btn btn-primary mt-4">Continue Shopping</Link>
    </div>
  );

}
