"use server";

import { Movie, MovieByGenre } from "@/app/types";
import { getGenreById, getMovies, getUserMovies } from ".";
import dayjs from "dayjs";

export async function getHomeData() {
  const movies = await getMovies();
  const moviesByGenre = await formatMovieData(movies);
  return {
    moviesByGenre,
    highlightedMovies: movies.filter((movie: Movie) => movie.highlighted),
    userMovies: await getFormatUserMovies(movies),
  };
}

const getFormatUserMovies = async (movies: Movie[]) => {
  const userM = await getUserMovies();
  return movies.filter((movie) => userM.includes(movie.id));
};

const formatMovieData = async (movies: Movie[]) => {
  const moviesByGenreAux: MovieByGenre[] = [];
  const comingSoonMovies: Movie[] = movies.filter((movie: any) =>
    dayjs("2023-01-28").isBefore(movie.availableDate)
  );

  // Filtra las películas que no están en comingSoon
  const otherMovies: Movie[] = movies.filter(
    (movie: any) => !comingSoonMovies.includes(movie)
  );

  // Obtén todos los distintos géneros de las películas que no están en comingSoon
  const uniqueGenres: string[] = [
    ...new Set(otherMovies.map((movie: { genre: string }) => movie.genre)),
  ];

  for (const genre of uniqueGenres) {
    const { name } = await getGenreById(genre);
    const movies: Movie[] = otherMovies.filter(
      (movie) => movie.genre === genre
    );
    moviesByGenreAux.push({ genreTitle: name, movies });
  }

  moviesByGenreAux.push({
    genreTitle: "Coming Soon",
    movies: comingSoonMovies,
  });

  return moviesByGenreAux;
};
