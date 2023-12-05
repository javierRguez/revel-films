"use client";
import { useMovies } from "@/hooks/useMovies";

export default function Home() {
  const { loadMoviesData } = useMovies();
  return (
    <div>
      Home
      <button onClick={() => loadMoviesData()}>CLICK ME</button>
    </div>
  );
}
