import "./styles/index.css";
import { useEffect, useState } from "react";
import useMovieSearch from "./hooks/useMovieSearch";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setSelectedMovie(null);
  }, [debouncedQuery]);

  const { searchResults, appStatus } = useMovieSearch(
    `https://api.tvmaze.com/search/shows?q=${debouncedQuery}`
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  return (
    <div className="App">
      <h1>MOVIE SEARCH APP</h1>

      <label htmlFor="userInput">Search TV Shows</label>
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
        searchResults.map((result: any) => (
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
