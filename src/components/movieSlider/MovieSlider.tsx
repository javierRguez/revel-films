import { Movie } from "@/app/types";
import Image from "next/image";
import styles from "./movieSlider.module.css";
import ResponsiveMarginContainer from "../responsiveMarginContainer/ResponsiveMarginContainer";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MovieSliderProps {
  movies: Movie[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
  const [movieIndex, setMovieIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setMovieIndex((prevSlide) =>
        prevSlide === movies.length - 1 ? 0 : prevSlide + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [movies]);

  const onClickControl = (index: number) => {
    setMovieIndex(index);
  };

  return movies.length > 0 ? (
    <div style={{ position: "relative", height: "inherit" }}>
      <div className={styles.container}>
        <Image
          src={movies[movieIndex]?.poster}
          alt={movies[movieIndex]?.title}
          width={0}
          height={0}
          sizes="100vw"
          className={styles["desktop-image"]}
        />
        <Image
          src={movies[movieIndex]?.thumbnail}
          alt={movies[movieIndex]?.title}
          width={0}
          height={0}
          sizes="100vw"
          className={styles["mobile-image"]}
        />
      </div>

      <div className={styles["description-container"]}>
        <ResponsiveMarginContainer>
          <div className={styles["description-wrap"]}>
            <div className={styles.title}>{movies[movieIndex]?.title}</div>
            <div className={styles.description}>
              {movies[movieIndex]?.description}
            </div>
            <div className={styles["button-container"]}>
              <Button
                color="primary"
                label="Discover"
                onClick={() => router.push(`/movies/${movies[movieIndex].id}`)}
              />
            </div>
          </div>
        </ResponsiveMarginContainer>
        <div className={styles["controls-container"]}>
          <div className={styles["controls-wrap"]}>
            {movies &&
              movies.map((movie, index) => (
                <div
                  onClick={() => onClickControl(index)}
                  key={movie.id}
                  className={`${styles.control} ${
                    index === movieIndex ? styles["control--active"] : ""
                  }`}
                ></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MovieSlider;
