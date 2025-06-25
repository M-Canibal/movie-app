// src/hooks/useMovieDetail.ts
import { useState, useEffect } from "react";
import axios from "axios";
import type { Movie } from "../types/Movie";
import { API_KEY, BASE_URL } from "../config";

export function useMovieDetail(id: string | undefined) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
        );
        setMovie(res.data);
      } catch {
        setError("Erro ao carregar detalhes do filme.");
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
}
