import { normalizeMovie } from "./normalizeMovie";

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
