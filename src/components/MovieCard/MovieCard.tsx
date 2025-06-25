import React from "react";
import type { Movie } from "../../types/Movie";
import { formatDate } from "../../utils/dateFormat";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=Sem+Imagem";

  const voteBg = movie.vote_average >= 6 ? "bg-green-600" : "bg-red-600";

  return (
    <Link to={`/movie/${movie.id}`} className="block rounded overflow-hidden shadow-lg hover:scale-105 transition-transform">
      <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
      <div className="p-4 bg-gray-900 text-white">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-sm mb-1">{formatDate(movie.release_date)}</p>
        <div className={`inline-block px-2 py-1 rounded text-white font-bold ${voteBg}`}>
          Nota: {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </Link>
  );
}
