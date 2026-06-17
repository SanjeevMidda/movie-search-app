import { normalizeMovie } from "./normalizeMovie";

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
