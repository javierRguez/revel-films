import { MovieByGenre } from "@/app/types";
import styles from "./genreFilter.module.css";
import FilterButton from "../filterButton/FilterButton";
import DraggableSection from "../draggableSection/DraggableSection";

interface GenreFilterProps {
  movies: MovieByGenre[];
}

const GenreFilter: React.FC<GenreFilterProps> = ({ movies }) => {
  return (
    <DraggableSection>
      <div className={styles.container}>
        {movies.map((genre) => (
          <div key={genre.genreTitle} className={styles["button-container"]}>
            <FilterButton
              label={genre.genreTitle}
              isActive={false}
              onClick={() => {}}
              disabled={false}
            />
          </div>
        ))}
      </div>
    </DraggableSection>
  );
};

export default GenreFilter;
