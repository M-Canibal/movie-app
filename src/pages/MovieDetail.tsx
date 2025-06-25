// src/pages/MovieDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../utils/formatDate";
import type { Movie } from "../types/Movie";
import { API_KEY, BASE_URL, IMAGE_BASE } from "../config";

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
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
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
    ? `${IMAGE_BASE}/original${movie.backdrop_path}`
    : "";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Banner */}
      <div
        className="relative h-[45vh] sm:h-[60vh] bg-cover bg-center flex-shrink-0 transition-all duration-700"
        style={{ backgroundImage: `url(${backdropUrl})` }}
        role="img"
        aria-label={`Imagem de fundo do filme ${movie.title}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        {/* Botão voltar */}
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
          className="absolute top-4 left-4 bg-gray-800 bg-opacity-70 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Voltar"
          type="button"
        >
          &larr; Voltar
        </button>

        {/* Info no banner */}
        <div className="absolute bottom-8 left-6 sm:left-12 text-white drop-shadow-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">{movie.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm sm:text-base items-center">
            <span>{formatDate(movie.release_date)}</span>
            <span className="bg-blue-600 px-3 py-1 rounded font-semibold">Nota: {movie.vote_average.toFixed(1)}</span>
            {movie.runtime != null && (
              <span className="bg-gray-800 bg-opacity-70 px-3 py-1 rounded">
                Duração: {movie.runtime} min
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="max-w-5xl w-full mx-auto p-6 flex-grow">
        {/* Sinopse */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 border-b border-gray-700 pb-1">Sinopse</h2>
          <p className="text-gray-300 leading-relaxed">{movie.overview || "Sem descrição disponível."}</p>
        </section>

        {/* Gêneros */}
        <section className="flex flex-wrap gap-3 mb-10">
          {movie.genres && movie.genres.length > 0 ? (
            movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-indigo-600 px-3 py-1 rounded-full text-sm font-medium text-white"
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
