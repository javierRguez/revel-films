"use client";
import MovieRow from "@/components/movieRow/MovieRow";
import { IdValue, MovieByGenre } from "./types";
import GenreFilter from "@/components/genreFilter/GenreFilter";
import { getMovieByGenreId } from "@/actions";
import { useState } from "react";
import { formatMovieData } from "@/utils";

interface MovieListProps {
  list: MovieByGenre[];
  genreList: IdValue[];
}

const MovieList: React.FC<MovieListProps> = ({ list, genreList }) => {
  const [formatMovies, setFormatMovies] = useState<MovieByGenre[]>(list);
  const [selectedGenre, setSelectedGenre] = useState("");
  const onClickFilter = (genreId: string) => {
    if (selectedGenre === genreId) {
      setFormatMovies(list);
      setSelectedGenre("");
    } else {
      setSelectedGenre(genreId);
      getMovieByGenreId(genreId).then((res) => {
        formatMovieData(res).then((value) =>
          setFormatMovies(value.moviesByGenre)
        );
      });
    }
  };
  return (
    <>
      <GenreFilter
        selected={selectedGenre}
        genreList={genreList || []}
        onClick={onClickFilter}
      />
      {formatMovies &&
        formatMovies.map((genre) => (
          <MovieRow
            key={genre.genreTitle}
            title={genre.genreTitle}
            movies={genre.movies}
          />
        ))}
    </>
  );
};

export default MovieList;
