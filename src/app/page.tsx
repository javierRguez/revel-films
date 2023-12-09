"use client";
import GenreFilter from "@/components/genreFilter/GenreFilter";
import MovieRow from "@/components/movieRow/MovieRow";
import MovieSlider from "@/components/movieSlider/MovieSlider";
import { useMovies } from "@/hooks/useMovies";
import { useEffect } from "react";

export default function Home() {
  const {
    loadMoviesData,
    filteredMoviesByGenre,
    userMovies,
    genreList,
    commingSoonMovies,
    highlightedMovies,
  } = useMovies();

  useEffect(() => {
    loadMoviesData();
  }, []);

  return (
    <div>
      <div style={{ width: "100%", height: "600px" }}>
        <MovieSlider movies={highlightedMovies} />
      </div>
      <GenreFilter genreList={genreList} />
      <div>
        {filteredMoviesByGenre &&
          filteredMoviesByGenre.map((genre) => (
            <MovieRow
              key={genre.genreTitle}
              title={genre.genreTitle}
              movies={genre.movies}
            />
          ))}
        {commingSoonMovies.length > 0 && (
          <MovieRow title="Coming Soon" movies={commingSoonMovies} />
        )}
        {userMovies.length > 0 && (
          <MovieRow title="My List" movies={userMovies} />
        )}
      </div>
    </div>
  );
}
