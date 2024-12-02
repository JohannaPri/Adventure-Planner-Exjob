import React from "react";
import { Star, StarHalf } from "@phosphor-icons/react";

interface StarRatingProps {
  value: number;
  maxStars?: number;
  size?: number;
  color?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  maxStars = 5,
  size = 20,
  color = "yellow-500",
}) => {
  const clampedValue = Math.min(Math.max(value, 0), maxStars);
  const fullStars = Math.floor(clampedValue);
  const hasHalfStar = clampedValue % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          key={`full-${index}`}
          size={size}
          weight="fill"
          className={`text-${color}`}
        />
      ))}

      {hasHalfStar && (
        <StarHalf size={size} weight="fill" className={`text-${color}`} />
      )}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star
          key={`empty-${index}`}
          size={size}
          weight="regular"
          className={`text-${color}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
