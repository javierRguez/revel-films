"use server";

import { Movie } from "@/app/types";
import { getMovies, getUserMovies } from ".";
import { formatMovieData } from "@/utils";

export async function getHomeData() {
  const movies = await getMovies();
  const { moviesByGenre, genreList, comingSoonMovies } = await formatMovieData(
    movies
  );
  return {
    movies,
    moviesByGenre,
    highlightedMovies: movies.filter((movie: Movie) => movie.highlighted),
    userMovies: await getFormatUserMovies(movies),
    genreList,
    comingSoonMovies,
  };
}

const getFormatUserMovies = async (movies: Movie[]) => {
  const userM = await getUserMovies();
  return movies.filter((movie) => userM.includes(movie.id));
};
