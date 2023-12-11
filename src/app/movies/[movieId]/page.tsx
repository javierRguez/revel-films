import { getGenreById, getMovieById, getUserMovies } from "@/actions";
import { Movie } from "@/app/types";
import MovieDetails from "./MovieDetails";
import { isComingSoon } from "@/utils";

interface IParams {
  movieId: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const movieDetails: Movie = await getMovieById(params.movieId);
  const { name } = await getGenreById(movieDetails.genre);
  const userMovies = await getUserMovies();
  const isComingSoonMovie = isComingSoon(movieDetails.availableDate);

  return (
    movieDetails && (
      <MovieDetails
        movieDetails={movieDetails}
        genreName={name}
        isComingSoonMovie={isComingSoonMovie}
        userMovies={userMovies}
      />
    )
  );
};

export default Page;
