export interface Show {
  id: number;
  name: string;
  summary?: string;
  image?: {
    medium: string;
    original: string;
  };
  rating?: {
    average: number | null;
  };
  genres: string[];
}
