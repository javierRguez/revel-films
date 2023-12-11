import { Movie } from "@/app/types";
import Image from "next/image";
import styles from "./movieCard.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isComingSoon } from "@/utils";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [xAxisPosition, setXAxisPosition] = useState<number>();
  const router = useRouter();
  const isComingSoonMovie = isComingSoon(movie.availableDate);
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setXAxisPosition(e.clientX);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (xAxisPosition && e.clientX === xAxisPosition) {
      const formatUrl = movie.id;
      router.push(`/movies/${formatUrl}`);
    }
  };
  return (
    movie?.thumbnail && (
      <div
        className={`${styles.container} ${
          isComingSoonMovie && styles["container--coming-soon"]
        }`}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
      >
        <Image
          src={isComingSoonMovie ? movie?.poster : movie?.thumbnail}
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
