import { useState, useEffect } from "react";
import axios from "axios";
import type { Movie } from "../types/Movie";

const API_KEY = "SUA_API_KEY_TMDB";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData<T>(url: string): Promise<T> {
  const response = await axios.get(url);
  return response.data;
}

export function useMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      setError(null);
      try {
        const endpoint = query
          ? `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`
          : `/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;

        const data = await fetchData<{ results: Movie[] }>(`${BASE_URL}${endpoint}`);

        // Ordena por nota decrescente
        const sorted = data.results.sort((a, b) => b.vote_average - a.vote_average);

        setMovies(sorted);
      } catch {
        setError("Erro ao buscar filmes");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, [query]);

  return { movies, loading, error };
}
