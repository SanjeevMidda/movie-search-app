import "./styles/index.css";
import { useEffect, useState } from "react";
import useMovieSearch from "./hooks/useMovieSearch";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import useDebounce from "./hooks/useDebounce";
import type { Show, SearchResult } from "./types/movie.api";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Show | null>(null);

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    setSelectedMovie(null);
  }, [debouncedQuery]);

  const { searchResults, appStatus } = useMovieSearch(
    `https://api.tvmaze.com/search/shows?q=${debouncedQuery}`
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1>MOVIE SEARCH APP</h1>

      <label htmlFor="userInput"></label>
      <input
        type="text"
        id="userInput"
        value={searchQuery}
        onChange={handleInputChange}
      />

      {appStatus === "idle" && <p>Search for a TV show to get started.</p>}

      {appStatus === "loading" && <p>Loading...</p>}

      {appStatus === "error" && <p>Error loading data. Try again.</p>}

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
