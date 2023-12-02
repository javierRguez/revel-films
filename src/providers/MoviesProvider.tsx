"use client";

import { MoviesContextProvider } from "@/hooks/useMovies";

interface MoviesProviderProps {
  children: React.ReactNode;
}

const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  return <MoviesContextProvider>{children}</MoviesContextProvider>;
};

export default MoviesProvider;
