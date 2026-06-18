import { useEffect, useState } from "react";
import { Status } from "../types/status";
import type { SearchResult } from "../types/movie.api";

const useMovieSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [appStatus, setAppStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);

      setAppStatus("idle");

      return;
    }

    const fetchData = async () => {
      try {
        setAppStatus("loading");

        setError(null);

        const request = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
        );

        if (!request.ok) {
          throw new Error(`HTTP error! Status: ${request.status}`);
        }

        const response: SearchResult[] = await request.json();

        setSearchResults(response);

        setAppStatus("success");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }

        setAppStatus("error");
      }
    };

    fetchData();
  }, [query]);
  return { searchResults, appStatus, error };
};

export default useMovieSearch;
