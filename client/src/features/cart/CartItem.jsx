import React from "react";
import { Link } from "react-router-dom";
import styles from "./CartItem.module.css";
import { useAppDispatch } from "../../app/hooks";
import { removeItem, setQuantity } from "./cartSlice";

export default function CartItem({ item }) {
  const dispatch = useAppDispatch();

  const handleQtyChange = (e) => {
    const qty = Number(e.target.value);
    if (qty >= 1) {
      dispatch(setQuantity({ productId: item.productId, quantity: qty }));
    }
  };

  return (
    <div className={styles.item}>
      <Link to={`/product/${item.productId}`}>
        <img src={item.image || "/placeholder.png"} alt={item.name} />
      </Link>

      <div className={styles.nameWrap}>
        <Link to={`/product/${item.productId}`}>{item.name}</Link>
      </div>

      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={handleQtyChange}
        className={styles.qty}
      />

      <div className={styles.price}>₹{(item.price * item.quantity).toLocaleString()}</div>

      <button
        className={styles.btnDel}
        onClick={() => dispatch(removeItem(item.productId))}
        aria-label="Remove"
      >
        ×
      </button>
    </div>
  );
}