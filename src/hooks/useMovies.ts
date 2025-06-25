import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "063f1d50791f7f275acde73b162729f2";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
}

export function useMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const url = query
          ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
          : `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;

        console.log("🔍 URL da requisição:", url);

        const response = await axios.get(url);
        console.log("🎬 Dados recebidos:", response.data);

        const sorted = response.data.results.sort(
          (a: Movie, b: Movie) => b.vote_average - a.vote_average
        );

        setMovies(sorted);
      } catch (err: any) {
        console.error("❌ Erro ao buscar filmes:", err.message);
        setError("Erro ao carregar filmes");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return { movies, loading, error };
}
