import "./styles/index.css";
import { useEffect, useState } from "react";
import useMovieSearch from "./hooks/useMovieSearch";

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
          <div
            key={result.show.id}
            onClick={() => setSelectedMovie(result.show)}
            style={{ cursor: "pointer" }}
          >
            <h2>{result.show.name}</h2>

            {result.show.image ? (
              <img src={result.show.image.medium} alt={result.show.name} />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}

      {selectedMovie && (
        <section className="selected-movie">
          <h2>{selectedMovie.name}</h2>

          {selectedMovie.image && (
            <img src={selectedMovie.image.original} alt={selectedMovie.name} />
          )}

          <p>
            Rating:
            {selectedMovie.rating?.average ?? "N/A"}
          </p>

          <p>
            Genres:
            {selectedMovie.genres?.join(", ")}
          </p>
        </section>
      )}
    </div>
  );
}

export default App;
