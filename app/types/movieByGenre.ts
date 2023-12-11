import { Movie } from "./movie";

export type MovieByGenre = {
  genreTitle: string;
  genreId: string;
  movies: Movie[];
};
