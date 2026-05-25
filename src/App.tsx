import "./styles/index.css";
import { API } from "./config/api";
import { useState } from "react";

function App() {
  console.log(API);

  const [searchQuery, setSearchQuery] = useState("");

  console.log(searchQuery);

  const userInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  return (
    <div className="App">
      <h1>MOVIE SEARCH APP</h1>

      <input
        type="text"
        id="userInput"
        value={searchQuery}
        onChange={userInput}
      />
    </div>
  );
}

export default App;
