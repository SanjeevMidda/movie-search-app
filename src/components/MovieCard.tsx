type Show = {
  id: number;
  name: string;
  image?: {
    medium: string;
    original: string;
  };
};

type MovieCardProps = {
  movie: Show;
  onSelect: (movie: Show) => void;
};

function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <button
      type="button"
      className="movie-card"
      onClick={() => onSelect(movie)}
    >
      <h2>{movie.name}</h2>

      {movie.image ? (
        <img src={movie.image.medium} alt={movie.name} />
      ) : (
        <p>No image available</p>
      )}
    </button>
  );
}

export default MovieCard;
