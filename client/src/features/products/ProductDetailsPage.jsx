import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useCreateReviewMutation,
  useGetProductReviewsQuery,
} from "../../api/productApi";
import Loader from "../../components/common/Loader.jsx";
import RatingStars from "./RatingStars";
import { useAppDispatch } from "../../app/hooks";
import { addItem } from "../cart/cartSlice";
import styles from "./ProductDetailsPage.module.css";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductQuery(id);
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
  } = useGetProductReviewsQuery(id, { skip: isLoading });
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const dispatch = useAppDispatch();

  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [comment, setComment] = React.useState("");

  if (isLoading) return <Loader />;
  if (error) return <p style={{ textAlign: "center" }}>Failed to load product.</p>;

  const product = data.product;

  const handleAddToCart = () => {
    dispatch(
      addItem({
        productId: id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0]?.url,
      })
    );
  };

  const handleSubmitReview = async () => {
    try {
      await createReview({ productId: id, rating, comment }).unwrap();
      setRating(0);
      setComment("");
    } catch (e) {
      alert(e.data?.message || "Review failed");
    }
  };

  return (
    <main className="container" style={{ paddingTop: "2rem" }}>
      <h1>{product.name}</h1>
      <img
        src={product.images?.[0]?.url || "/placeholder.jpg"}
        alt={product.name}
      />
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>
      <p>
        <strong>Rating:</strong> <RatingStars value={product.ratings} />
      </p>
      <button onClick={handleAddToCart}>Add to cart</button>

      <hr />
      <section className={styles.reviewSection}>
        <h2>Submit a review</h2>
        <div className={styles.starInput}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= (hover || rating) ? styles.filled : styles.empty}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
        />
        <button
          disabled={rating === 0 || !comment || isSubmitting}
          onClick={handleSubmitReview}
        >
          {isSubmitting ? "Submitting…" : "Submit Review"}
        </button>
      </section>

      <hr />
      <section className={styles.reviewList}>
        <h2>Reviews</h2>
        {reviewsData?.reviews?.length ? (
          reviewsData.reviews.map((rev) => (
            <div key={rev._id} className={styles.reviewItem}>
              <p>
                <strong>{rev.name}</strong>
              </p>
              <RatingStars value={rev.rating} />
              <p>{rev.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </main>
  );
}