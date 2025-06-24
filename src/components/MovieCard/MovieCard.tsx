import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { getRatingColor } from "../../utils/getRatingColor";
import type { Movie } from "../../types/Movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`} aria-label={`Detalhes do filme ${movie.title}`}>
      <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-blue-200">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-auto object-cover"
        />

        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-lg text-white text-xs font-semibold select-none"
          style={{ backgroundColor: getRatingColor(movie.vote_average) }}
        >
          Nota: {movie.vote_average.toFixed(1)}
        </div>

        <div className="p-3 bg-white dark:bg-gray-900">
          <h3 className="text-md font-semibold mb-1">{movie.title}</h3>
          <p className="text-sm text-gray-500">{formatDate(movie.release_date)}</p>
        </div>
      </div>
    </Link>
  );
}
