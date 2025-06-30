import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import styles from "./ProductCard.module.css";
export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={product.images?.[0]?.url || "/placeholder.png"} alt={product.name} />
      </div>
      <div className={styles.body}>
        <h3>{product.name}</h3>
        <RatingStars value={product.ratings} />
        <p className={styles.price}>₹{product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}