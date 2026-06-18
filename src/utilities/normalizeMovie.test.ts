import { normalizeMovie } from "./normalizeMovie";

// normalize movie test
describe("normalizeMovie", () => {
  it("transforms API response correctly", () => {
    const input = {
      show: {
        id: 1,
        name: "Batman",
        image: {
          medium: "batman.jpg",
        },
        summary: "<p>Hero</p>",
      },
    };

    expect(normalizeMovie(input)).toEqual({
      id: 1,
      name: "Batman",
      image: "batman.jpg",
      summary: "<p>Hero</p>",
    });
  });
});

// img data test
const input = {
  show: {
    id: 1,
    name: "Batman",
    image: null,
  },
};

it("handles missing image data", () => {
  const result = normalizeMovie(input);
  expect(result).not.toBeNull();

  expect(result!.image).toBeNull();
});

// empty API results test
it("handles empty API results", () => {
  expect(normalizeMovie(null)).toBeNull();
});

export {};

// API transformation test
describe("normalizeMovie", () => {
  it("transforms API response correctly", () => {
    const apiMovie = {
      show: {
        id: 1,
        name: "Batman",
        image: {
          medium: "batman.jpg",
        },
        summary: "<p>Hero</p>",
      },
    };

    const result = normalizeMovie(apiMovie);

    expect(result).toEqual({
      id: 1,
      name: "Batman",
      image: "batman.jpg",
      summary: "<p>Hero</p>",
    });
  });
});
