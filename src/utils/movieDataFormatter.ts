import { Movie, MovieByGenre } from "@/app/types";
import dayjs from "dayjs";

const getFormatUserMovies = (userMoviesId: string[], movies: Movie[]) => {
  return movies.filter((movie) => userMoviesId.includes(movie.id));
};

const getFormatMoviesByGenre = (movies: Movie[], genreName: string) => {
  const genreId = movies[0].genre;
  return [{ genreTitle: genreName, genreId, movies }];
};

export { getFormatUserMovies, getFormatMoviesByGenre };
