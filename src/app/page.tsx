"use client";
import { signOut, useSession } from "next-auth/react";
import { useMovies } from "@/hooks/useMovies";

export default function Home() {
  const {
    getMovies,
    getMovieById,
    getGenres,
    getGenreById,
    getMoviesByGenreId,
    getUserMovies,
    addMovieToUserList,
    removeMovieToUserList,
  } = useMovies();
  return (
    <div>
      Home
      <button
        onClick={() =>
          removeMovieToUserList("84c7f511-ae81-4ab3-a8d0-0fea1184d45b")
        }
      >
        CLICK ME
      </button>
    </div>
  );
}
