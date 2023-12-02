import { createContext, useCallback, useContext, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface MoviesContextType {
  getMovies: () => void;
  getMovieById: (movieId: string) => void;
  getGenres: () => void;
  getGenreById: (genreId: string) => void;
  getMoviesByGenreId: (genreId: string) => void;
  getUserMovies: () => void;
  removeMovieToUserList: (movieId: string) => void;
  addMovieToUserList: (movieId: string) => void;
}

export const MoviesContext = createContext<MoviesContextType | null>(null);

type Props = Record<string, any>;

export const MoviesContextProvider = (props: Props) => {
  const [MoviesData, setMoviesData] = useState(null);

  const getMovies = useCallback(async () => {
    await fetch(`/api/movies`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("==============>", movies);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const getMovieById = useCallback(async (movieId: string) => {
    await fetch(`/api/movies/${movieId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((movieDetails) => {
        console.log("==============>", movieDetails);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const getGenres = useCallback(async () => {
    await fetch(`/api/genres`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((genres) => {
        console.log("==============>", genres);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const getGenreById = useCallback(async (genreId: string) => {
    await fetch(`/api/genres/${genreId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((genreDetails) => {
        console.log("==============>", genreDetails);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const getMoviesByGenreId = useCallback(async (genreId: string) => {
    await fetch(`/api/genres/${genreId}/movies`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("==============>", movies);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const getUserMovies = useCallback(async () => {
    await fetch(`/api/user`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((userMovies) => {
        console.log("==============>", userMovies);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const addMovieToUserList = useCallback(async (movieId: string) => {
    await fetch(`/api/user/list/${movieId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((userMoviesList) => {
        console.log("==============>", userMoviesList);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const removeMovieToUserList = useCallback(async (movieId: string) => {
    await fetch(`/api/user/list/${movieId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((userMoviesList) => {
        console.log("==============>", userMoviesList);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const value = {
    getMovies,
    getMovieById,
    getGenres,
    getGenreById,
    getMoviesByGenreId,
    getUserMovies,
    addMovieToUserList,
    removeMovieToUserList,
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
