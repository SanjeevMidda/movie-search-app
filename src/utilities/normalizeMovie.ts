export const normalizeMovie = (item: any) => ({
  id: item.show.id,

  name: item.show.name,

  image: item.show.image?.medium ?? null,

  summary: item.show.summary ?? "",
});
