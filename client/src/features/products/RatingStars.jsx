import React from "react";
import "./RatingStars.css";

export default function RatingStars({ value = 0 }) {
  const full  = Math.floor(value);
  const half  = value % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="stars" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(full)}
      {half && "☆"}
      {"☆".repeat(empty)}
    </span>
  );
}