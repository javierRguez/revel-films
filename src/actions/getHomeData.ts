"use server";

import { IdValue, Movie, MovieByGenre } from "@/app/types";
import { getGenreById, getMovies, getUserMovies } from ".";
import dayjs from "dayjs";

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

const formatMovieData = async (movies: Movie[]) => {
  const genreList: IdValue[] = [];
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
    genreList.push({ id: genre, value: name });
    moviesByGenreAux.push({ genreTitle: name, genreId: genre, movies });
  }

  return {
    moviesByGenre: moviesByGenreAux,
    genreList,
    comingSoonMovies,
  };
};
