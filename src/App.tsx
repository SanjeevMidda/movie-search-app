import "./styles/index.css";
import { useState } from "react";
import useMovieSearch from "./hooks/useMovieSearch";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import useDebounce from "./hooks/useDebounce";
import type { Show, SearchResult } from "./types/movie.api";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Show | null>(null);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const { searchResults, appStatus, error } = useMovieSearch(debouncedQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <h1>MOVIE SEARCH APP</h1>

      <input
        type="text"
        aria-label="Search TV Shows"
        placeholder="Search for a TV show..."
        id="userInput"
        value={searchQuery}
        onChange={handleInputChange}
      />

      {appStatus === "loading" && <p>Loading...</p>}

      {appStatus === error && <p>Error loading data. Try again.</p>}

      {appStatus === "success" && searchResults.length === 0 && (
        <p>No results found.</p>
      )}

      {appStatus === "success" &&
        searchResults.length > 0 &&
        searchResults.map((result: SearchResult) => (
          <MovieCard
            key={result.show.id}
            movie={result.show}
            onSelect={setSelectedMovie}
          />
        ))}

      <MovieDetails movie={selectedMovie} />
    </div>
  );
}

export default App;
