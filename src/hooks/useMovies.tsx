import { createContext, useCallback, useContext, useState } from "react";
import { Movie, MovieByGenre } from "@/app/types";
import { getHomeData } from "@/actions";

interface MoviesContextType {
  loadMoviesData: () => void;
  moviesByGenre: MovieByGenre[];
  highlightedMovies: Movie[];
  userMovies: Movie[];
}

export const MoviesContext = createContext<MoviesContextType | null>(null);

type Props = Record<string, any>;

export const MoviesContextProvider = (props: Props) => {
  const [highlightedMovies, setHighlightedMovies] = useState<Movie[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<MovieByGenre[]>([]);
  const [userMovies, setUserMovies] = useState<Movie[]>([]);

  const loadMoviesData = useCallback(async () => {
    const { moviesByGenre, highlightedMovies, userMovies } =
      await getHomeData();
    setHighlightedMovies(highlightedMovies);
    setMoviesByGenre(moviesByGenre);
    setUserMovies(userMovies);
  }, []);

  const value = {
    loadMoviesData,
    highlightedMovies,
    moviesByGenre,
    userMovies,
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
