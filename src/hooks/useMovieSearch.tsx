import { useEffect, useState } from "react";
import { Status } from "../types/status";

const useMovieSearch = async (url: any) => {
  const [searchResults, setSearchResults] = useState("");

  try {
    const request = await fetch(url);

    if (!request.ok) {
      throw new Error(`HTTP error! Status: ${request.status}`);
    }
    const response = await request.json();

    setSearchResults(response);
  } catch (error) {
    console.error("Network or fecth error", error);
  }

  //   useEffect(() => {}, []);
  return searchResults;
};

export default useMovieSearch;
