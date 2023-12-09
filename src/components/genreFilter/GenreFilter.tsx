import styles from "./genreFilter.module.css";
import FilterButton from "../filterButton/FilterButton";
import DraggableSection from "../draggableSection/DraggableSection";
import { useMovies } from "@/hooks/useMovies";
import { IdValue } from "@/app/types";

interface GenreFilterProps {
  genreList: IdValue[];
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genreList }) => {
  const { filterByGenre, selectedGenreFilter } = useMovies();
  return (
    <DraggableSection>
      <div className={styles.container}>
        {genreList.map((genre) => (
          <div key={genre.id} className={styles["button-container"]}>
            <FilterButton
              label={genre.value}
              isActive={selectedGenreFilter === genre.id}
              onClick={() => filterByGenre(genre.id, genre.value)}
              disabled={false}
            />
          </div>
        ))}
      </div>
    </DraggableSection>
  );
};

export default GenreFilter;
