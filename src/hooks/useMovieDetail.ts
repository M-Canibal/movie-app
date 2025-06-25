import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../utils/formatDate";
import type { Movie } from "../types/Movie";
import { min } from "date-fns";

const API_KEY = "SUA_API_KEY_TMDB";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
        );
        setMovie(res.data);
      } catch {
        setError("Erro ao carregar detalhes do filme.");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center p-8">Carregando...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!movie) return <div className="text-center p-8">Filme não encontrado.</div>;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Banner */}
      <div
        className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url(${backdropUrl})` }}
        role="img"
        aria-label={`Imagem de fundo do filme ${movie.title}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

        {/* Botão voltar */}
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
          className="absolute top-4 left-4 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-white px-4 py-2 rounded transition"
          aria-label="Voltar"
          type="button"
        >
          &larr; Voltar
        </button>

        {/* Info no banner */}
        <div className="absolute bottom-8 left-8 max-w-xl text-white drop-shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{movie.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm sm:text-base items-center">
            <span>{formatDate(movie.release_date)}</span>

            <span className="bg-blue-600 px-3 py-1 rounded font-semibold">
              Nota: {movie.vote_average.toFixed(1)}
            </span>

            {movie.runtime != null && (
              <span className="bg-gray-700 bg-opacity-70 px-3 py-1 rounded">
                Duração: {movie.runtime} min
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal abaixo do banner */}
      <main className="max-w-6xl mx-auto p-6 flex-grow">
        {/* Sinopse */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Sinopse
          </h2>
          <p className="text-gray-300 leading-relaxed">{movie.overview || "Sem descrição."}</p>
        </section>

        {/* Gêneros */}
        <section className="mb-6 flex flex-wrap gap-4 items-center">
          {movie.genres && movie.genres.length > 0 ? (
            movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {genre.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500">Gêneros não disponíveis</span>
          )}
        </section>
      </main>
    </div>
  );
}
