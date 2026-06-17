type Show = {
  id: number;
  name: string;
  image?: {
    medium: string;
    original: string;
  };
  rating?: {
    average: number | null;
  };
  genres: string[];
};

type MovieDetailsProps = {
  movie: Show | null;
};

function MovieDetails({ movie }: MovieDetailsProps) {
  if (!movie) return null;

  return (
    <section className="selected-movie">
      <h2>{movie.name}</h2>

      {movie.image && <img src={movie.image.original} alt={movie.name} />}

      <p>Rating: {movie.rating?.average ?? "N/A"}</p>

      <p>Genres: {movie.genres?.join(", ")}</p>
    </section>
  );
}

export default MovieDetails;
