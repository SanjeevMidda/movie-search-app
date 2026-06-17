import "./styles/index.css";
import { API } from "./config/api";
import { useState } from "react";
import useMovieSearch from "./hooks/useMovieSearch";
import { Status } from "./types/status";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const { searchResults, appStatus } = useMovieSearch(
    `https://api.tvmaze.com/search/shows?q=${searchQuery}`
  );

  const userInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  console.log(searchResults);

  return (
    <div className="App">
      <h1>MOVIE SEARCH APP</h1>

      <input
        type="text"
        id="userInput"
        value={searchQuery}
        onChange={userInput}
      />

      {appStatus === "loading" && "Data loading."}

      {appStatus === "success" && "Data loaded."}

      {appStatus === "error" && "Error loading data. Try again."}
    </div>
  );
}

export default App;
