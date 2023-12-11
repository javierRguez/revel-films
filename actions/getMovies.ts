"use server";

import { formatMovieData } from "@/utils";
import { getCurrentUser } from "./getCurrentUser";
import { IdValue, Movie, MovieByGenre } from "@/app/types";

type Response = {
  moviesByGenre: MovieByGenre[];
  genreList: IdValue[];
  comingSoonMovies: Movie[];
  movies: Movie[];
  highlightedMovies: Movie[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function getMovies() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.token) {
      return null;
    } else {
      const res = await fetch(`${API_BASE_URL}/movies`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const movies = await res.json();

      const { moviesByGenre, genreList, comingSoonMovies } =
        await formatMovieData(movies);
      const respo: Response = {
        moviesByGenre,
        genreList,
        comingSoonMovies,
        highlightedMovies: movies?.filter((movie: Movie) => movie.highlighted),
        movies,
      };
      return respo;
    }
  } catch (error) {
    return null;
  }
}
