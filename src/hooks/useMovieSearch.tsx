import { useEffect, useState } from "react";
import { Status } from "../types/status";
import { API } from "../config/api";

const useMovieSearch = (url: string) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [appStatus, setAppStatus] = useState<Status>("loading");

  const fetchData = async () => {
    try {
      setAppStatus("loading");

      const request = await fetch(url);

      if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
      }
      const response = await request.json();
      setAppStatus("success");

      setSearchResults(response);
    } catch (error) {
      console.error("Network or fetch error", error);
      setAppStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);
  return { searchResults, appStatus };
};

export default useMovieSearch;
