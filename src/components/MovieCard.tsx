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
    <div onClick={() => onSelect(movie)} style={{ cursor: "pointer" }}>
      <h2>{movie.name}</h2>

      {movie.image ? (
        <img src={movie.image.medium} alt={movie.name} />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}

export default MovieCard;
