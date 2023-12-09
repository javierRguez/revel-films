import { Movie } from "@/app/types";
import Image from "next/image";
import styles from "./movieCard.module.css";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [xAxisPosition, setXAxisPosition] = useState<number>();

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setXAxisPosition(e.clientX);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (xAxisPosition && e.clientX === xAxisPosition) {
      console.log("yeeah");
    }
  };
  return (
    movie?.thumbnail && (
      <div
        className={styles.container}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
      >
        <Image
          src={movie?.thumbnail}
          alt="movie thumbnail"
          className={styles["movie-card"]}
          fill
          sizes="(max-width:261px)"
        />
      </div>
    )
  );
};

export default MovieCard;
