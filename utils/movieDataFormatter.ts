import { getGenreById } from "@/actions";
import { IdValue, Movie, MovieByGenre } from "@/app/types";
import dayjs from "dayjs";

const getFormatUserMovies = (userMoviesId: string[], movies: Movie[]) => {
  return movies.filter((movie) => userMoviesId.includes(movie.id));
};

const getFormatMoviesByGenre = (movies: Movie[], genreName: string) => {
  const genreId = movies[0].genre;
  return [{ genreTitle: genreName, genreId, movies }];
};

const isComingSoon = (date: Date): boolean => {
  //return dayjs("2023-01-28").isBefore(date);
  return dayjs().isBefore(date);
};

const formatMovieData = async (movies: Movie[]) => {
  const genreList: IdValue[] = [];
  const moviesByGenreAux: MovieByGenre[] = [];
  const comingSoonMovies: Movie[] = movies.filter((movie: any) =>
    isComingSoon(movie.availableDate)
  );

  const otherMovies: Movie[] = movies.filter(
    (movie: any) => !comingSoonMovies.includes(movie)
  );

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

export {
  getFormatUserMovies,
  getFormatMoviesByGenre,
  isComingSoon,
  formatMovieData,
};
