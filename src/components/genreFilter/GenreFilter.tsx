import styles from "./genreFilter.module.css";
import DraggableSection from "../draggableSection/DraggableSection";
import { useMovies } from "@/hooks/useMovies";
import { IdValue } from "@/app/types";
import Button from "../button/Button";

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
            <Button
              label={genre.value}
              isActive={selectedGenreFilter === genre.id}
              onClick={() => filterByGenre(genre.id, genre.value)}
              color="secondary"
            />
          </div>
        ))}
      </div>
    </DraggableSection>
  );
};

export default GenreFilter;
