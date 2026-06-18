import { useEffect, useState } from "react";
import { Status } from "../types/status";

const useMovieSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [appStatus, setAppStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setAppStatus("loading");
      setError(null);

      // const request = await fetch(url);
      const request = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );

      if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
      }
      const response = await request.json();
      setAppStatus("success");

      setSearchResults(response);
    } catch (err: any) {
      setError(err.message);
      setAppStatus("error");
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);

      setAppStatus("idle");

      return;
    }

    fetchData();
  }, [query]);
  return { searchResults, appStatus };
};

export default useMovieSearch;
