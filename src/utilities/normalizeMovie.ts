type Movie = {
  id: number;
  name: string;
  image: string | null;
  summary?: string;
};

export const normalizeMovie = (item: any): Movie | null => {
  if (!item?.show) {
    return null;
  }

  return {
    id: item.show.id,
    name: item.show.name,
    image: item.show.image?.medium ?? null,
    summary: item.show.summary,
  };
};
