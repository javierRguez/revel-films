"use client";
import FilterButton from "@/components/filterButton/FilterButton";
import GenreFilter from "@/components/genreFilter/GenreFilter";
import MovieRow from "@/components/movieRow/MovieRow";
import ResponsiveMarginContainer from "@/components/responsiveMarginContainer/ResponsiveMarginContainer";
import { useMovies } from "@/hooks/useMovies";

export default function Home() {
  const { loadMoviesData, moviesByGenre, userMovies } = useMovies();

  return (
    <div>
      Home
      <button onClick={() => loadMoviesData()}>CLICK ME</button>
      <GenreFilter movies={moviesByGenre} />
      <div>
        {moviesByGenre &&
          moviesByGenre.map((genre) => (
            <MovieRow
              key={genre.genreTitle}
              title={genre.genreTitle}
              movies={genre.movies}
            />
          ))}
        {userMovies.length > 0 && (
          <MovieRow title="My List" movies={userMovies} />
        )}
      </div>
    </div>
  );
}
