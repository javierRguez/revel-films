"use client";
import styles from "./genreFilter.module.css";
import DraggableSection from "../draggableSection/DraggableSection";

import { IdValue } from "@/app/types";
import Button from "../button/Button";

interface GenreFilterProps {
  genreList: IdValue[];
  selected: string;
  onClick: (genreId: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genreList,
  selected,
  onClick,
}) => {
  return (
    <DraggableSection>
      <div className={styles.container}>
        {genreList.map((genre) => (
          <div key={genre.id} className={styles["button-container"]}>
            <Button
              label={genre.value}
              isActive={genre.id === selected}
              onClick={() => onClick(genre.id)}
              color="secondary"
            />
          </div>
        ))}
      </div>
    </DraggableSection>
  );
};

export default GenreFilter;
