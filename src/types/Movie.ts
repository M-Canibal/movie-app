export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview?: string;
  backdrop_path?: string | null;

  tagline?: string;
  runtime?: number;
  original_language?: string;
  genres?: Genre[];
}
