import { createContext, useCallback, useContext, useState } from "react";
import { IdValue, Movie, MovieByGenre } from "@/app/types";
import { getHomeData, getMovieByGenreId, getMovieById } from "@/actions";
import { getFormatMoviesByGenre } from "@/utils";

interface MoviesContextType {
  loadMoviesData: () => void;
  moviesByGenre: MovieByGenre[];
  filteredMoviesByGenre: MovieByGenre[];
  highlightedMovies: Movie[];
  userMovies: Movie[];
  commingSoonMovies: Movie[];
  genreList: IdValue[];
  selectedGenreFilter: string;
  filterByGenre: (genreId: string, genreName: string) => void;
  getMovieDetails: (movieId: string) => void;
  movieDetails: Movie | null;
}

export const MoviesContext = createContext<MoviesContextType | null>(null);

type Props = Record<string, any>;

export const MoviesContextProvider = (props: Props) => {
  const [highlightedMovies, setHighlightedMovies] = useState<Movie[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<MovieByGenre[]>([]);
  const [filteredMoviesByGenre, setFilteredMoviesByGenre] = useState<
    MovieByGenre[]
  >([]);
  const [commingSoonMovies, setCommingSoonMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [userMovies, setUserMovies] = useState<Movie[]>([]);
  const [genreList, setGenreList] = useState<IdValue[]>([]);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  const loadMoviesData = useCallback(async () => {
    const {
      moviesByGenre,
      highlightedMovies,
      userMovies,
      genreList,
      movies,
      comingSoonMovies,
    } = await getHomeData();
    setHighlightedMovies(highlightedMovies);
    setMoviesByGenre(moviesByGenre);
    setFilteredMoviesByGenre(moviesByGenre);
    setUserMovies(userMovies);
    setGenreList(genreList);
    setMovies(movies);
    setCommingSoonMovies(comingSoonMovies);
  }, []);

  const filterByGenre = async (genreId: string, genreName: string) => {
    let moviesAux: MovieByGenre[] = [];

    if (selectedGenreFilter === genreId) {
      setSelectedGenreFilter("");
      moviesAux = moviesByGenre;
    } else {
      const filterMovies = await getMovieByGenreId(genreId);
      const formatMovies = getFormatMoviesByGenre(filterMovies, genreName);
      setSelectedGenreFilter(genreId);
      moviesAux = formatMovies;
    }

    setFilteredMoviesByGenre(moviesAux);
  };

  const getMovieDetails = async (movieId: string) => {
    const movieDetails = await getMovieById(movieId);
    setMovieDetails(movieDetails);
  };

  const value = {
    loadMoviesData,
    highlightedMovies,
    moviesByGenre,
    userMovies,
    genreList,
    filterByGenre,
    commingSoonMovies,
    selectedGenreFilter,
    filteredMoviesByGenre,
    getMovieDetails,
    movieDetails,
  };

  return <MoviesContext.Provider value={value} {...props} />;
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === null) {
    throw new Error("useMovies must be used within a MoviesContextProvider");
  }

  return context;
};
