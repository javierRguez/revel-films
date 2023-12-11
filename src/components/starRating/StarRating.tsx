"use client";

import styles from "./starRating.module.css";
import Image from "next/image";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= rating; i++) {
      stars.push(
        <Image
          key={i}
          src="/star-icon.png"
          alt="star rating"
          height={20}
          width={20}
        />
      );
    }

    return stars;
  };

  return <div className={styles.container}>{renderStars()}</div>;
};

export default StarRating;
