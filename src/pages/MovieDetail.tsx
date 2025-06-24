import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../utils/formatDate";
import type { Movie } from "../types/Movie";

const API_KEY = "063f1d50791f7f275acde73b162729f2";
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get<Movie>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
        setMovie(res.data);
      } catch {
        setError("Erro ao carregar detalhes do filme.");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchMovie();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Carregando...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
  if (!movie) return null;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Voltar
      </Link>
      <div className="flex flex-col md:flex-row gap-6">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg flex-shrink-0 max-w-xs mx-auto md:mx-0"
          />
        ) : (
          <div className="w-64 h-96 bg-gray-300 flex items-center justify-center rounded-lg">
            Sem imagem
          </div>
        )}

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && <p className="italic text-gray-400 mb-4">{movie.tagline}</p>}
          <p className="mb-4">{movie.overview}</p>

          <p>
            <strong>Data de lançamento:</strong> {formatDate(movie.release_date)}
          </p>
          <p>
            <strong>Duração:</strong> {movie.runtime ? `${movie.runtime} min` : "Não disponível"}
          </p>
          <p>
            <strong>Idioma original:</strong> {movie.original_language?.toUpperCase() ?? "Não disponível"}
          </p>

          {movie.genres && movie.genres.length > 0 && (
            <>
              <h3 className="font-semibold text-lg mt-6 mb-2">Gêneros</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </>
          )}

          <p className="mt-4">
            <strong>Avaliação:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded ${
                movie.vote_average > 6 ? "bg-green-600" : "bg-red-600"
              } text-white font-semibold`}
            >
              {movie.vote_average.toFixed(1)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
