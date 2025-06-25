// src/hooks/useMovies.ts
import { useState, useEffect } from "react";
import axios from "axios";
import type { Movie } from "../types/Movie";
import { API_KEY, BASE_URL } from "../config";

export function useMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const url = query
          ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`
          : `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;

        const res = await axios.get(url);
        const sortedMovies = res.data.results.sort(
          (a: Movie, b: Movie) => b.vote_average - a.vote_average
        );
        setMovies(sortedMovies);
      } catch {
        setError("Erro ao carregar filmes.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [query]);

  return { movies, loading, error };
}
