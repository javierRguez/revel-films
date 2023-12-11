import { getMovies, getUserMovies } from "@/actions";
import GenreFilter from "@/components/genreFilter/GenreFilter";
import MovieRow from "@/components/movieRow/MovieRow";
import MovieSlider from "@/components/movieSlider/MovieSlider";
import MovieList from "./MovieList";

export default async function Home() {
  const result = await getMovies();
  const userMoviesIds = await getUserMovies();
  const userMovies = result?.movies.filter((movie) =>
    userMoviesIds.includes(movie.id)
  );

  return (
    <div>
      <div className="movie-slider-container">
        <MovieSlider movies={result?.highlightedMovies || []} />
      </div>

      <div>
        <MovieList
          list={result?.moviesByGenre || []}
          genreList={result?.genreList || []}
        />
        {result?.comingSoonMovies && result?.comingSoonMovies.length > 0 && (
          <MovieRow title="Coming Soon" movies={result?.comingSoonMovies} />
        )}
        {userMovies && userMovies.length > 0 && (
          <MovieRow title="My List" movies={userMovies} />
        )}
      </div>
    </div>
  );
}
