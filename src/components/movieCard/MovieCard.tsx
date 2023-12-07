import { Movie } from "@/app/types";
import Image from "next/image";
import styles from "./movieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    movie?.thumbnail && (
      <div className={styles.container}>
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
