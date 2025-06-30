import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CartItem from "./CartItem";
import { clearCart } from "./cartSlice.js";

export default function CartPage() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="container" style={{ paddingTop: "2rem", textAlign: "center" }}>
        <h1>Your cart is empty 🛒</h1>
        <Link to="/">Start shopping</Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: "2rem" }}>
      <h1>Cart</h1>
      {items.map((it) => (
        <CartItem key={it.productId} item={it} />
      ))}

      <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
        <h2>Subtotal: ₹{subtotal.toLocaleString()}</h2>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
        <button style={{ marginLeft: "1rem" }} onClick={() => dispatch(clearCart())}>
          Clear cart
        </button>
      </div>
    </main>
  );
}