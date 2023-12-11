"use client";
import styles from "./movieDetails.module.css";
import { Movie } from "@/app/types";
import ResponsiveMarginContainer from "@/components/responsiveMarginContainer/ResponsiveMarginContainer";
import Image from "next/image";
import StarRating from "@/components/starRating/StarRating";
import Button from "@/components/button/Button";
import { addMovieToUserList, removeMovieToUserList } from "@/actions";
import { useState } from "react";

interface MovieDetailsProps {
  movieDetails: Movie;
  genreName: string;
  isComingSoonMovie: boolean;
  userMovies: string[];
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movieDetails,
  genreName,
  isComingSoonMovie,
  userMovies,
}) => {
  const [isUserMovie, setIsUserMovie] = useState(
    userMovies?.includes(movieDetails.id)
  );

  const onClickAddMovie = () => {
    if (isUserMovie) {
      removeMovieToUserList(movieDetails.id);
      setIsUserMovie(false);
    } else {
      addMovieToUserList(movieDetails.id);
      setIsUserMovie(true);
    }
  };

  return (
    <div>
      <div className={styles["image-container"]}>
        <Image
          priority
          src={movieDetails.poster}
          alt="movie thumbnail"
          fill
          className={styles["desktop-image"]}
        />
        <Image
          priority
          src={movieDetails.thumbnail}
          alt="movie thumbnail"
          fill
          className={styles["mobile-image"]}
        />
        <div className={styles["button-wrap"]}>
          <div className={styles["button-container-desktop"]}>
            <Button color="secondary" label="Trailer" onClick={() => {}} />
            {!isComingSoonMovie && (
              <Button
                color="primary"
                label="Play"
                isActive={true}
                onClick={() => {}}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMarginContainer>
        <div className={styles["button-container-mobile"]}>
          <Button color="secondary" label="Trailer" onClick={() => {}} />
          {!isComingSoonMovie && (
            <Button
              color="primary"
              label="Play"
              isActive={true}
              onClick={() => {}}
            />
          )}
        </div>
        <div
          className={styles["add-movie-container"]}
          onClick={() => onClickAddMovie()}
        >
          <Image
            src={isUserMovie ? "/user-star-icon.svg" : "/plus-icon.svg"}
            alt="plus icon"
            height={40}
            width={41}
          />
          <span className={styles["description-tag"]}>
            {isUserMovie ? "Remove from my list" : "Add to my list"}
          </span>
        </div>
        <div className={styles["tag-container"]}>
          <span className={styles["description-tag"]}>
            Rating: <StarRating rating={movieDetails.rating || 1} />
          </span>
          <span className={styles["description-tag"]}>
            Cast: {movieDetails.cast}
          </span>
          <span className={styles["description-tag"]}>Genre: {genreName}</span>
        </div>
        <div className={styles["detail-container"]}>
          <h1 className={styles.title}>{movieDetails.title}</h1>
          <p className={styles.description}>{movieDetails.description}</p>
        </div>
      </ResponsiveMarginContainer>
    </div>
  );
};

export default MovieDetails;
