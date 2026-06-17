import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import useMovieSearch from "./hooks/useMovieSearch";

jest.mock("../hooks/useMovieSearch");

// loading state
const mockedUseMovieSearch = useMovieSearch as jest.Mock;

test("shows loading state", () => {
  mockedUseMovieSearch.mockReturnValue({
    searchResults: [],
    appStatus: "loading",
  });

  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
