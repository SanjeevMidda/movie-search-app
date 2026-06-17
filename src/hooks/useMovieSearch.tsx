import { useEffect, useState } from "react";
import { Status } from "../types/status";

const useMovieSearch = (url: string) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [appStatus, setAppStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setAppStatus("loading");
      setError(null);

      const request = await fetch(url);

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
    if (!url) {
      return;
    }

    fetchData();
  }, [url]);
  return { searchResults, appStatus };
};

export default useMovieSearch;
