import { normalizeMovie } from "./normalizeMovie";

const input = {
  show: {
    id: 1,
    name: "Batman",
    image: null,
  },
};

it("handles missing image data", () => {
  const result = normalizeMovie(input);

  expect(result.image).toBeNull();
});
