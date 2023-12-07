import { Movie } from "@/app/types";
import styles from "./movieRow.module.css";
import MovieCard from "../movieCard/MovieCard";
import DraggableSection from "../draggableSection/DraggableSection";
import ResponsiveMarginContainer from "../responsiveMarginContainer/ResponsiveMarginContainer";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ movies, title }) => {
  return (
    <div>
      <ResponsiveMarginContainer>
        <h2 className={styles["genre-title"]}>{title}</h2>
      </ResponsiveMarginContainer>
      <DraggableSection>
        <div className={styles.row}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </DraggableSection>
    </div>
  );
};

export default MovieRow;
