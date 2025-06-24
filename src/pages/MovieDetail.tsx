import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MovieDetail.module.css";
import { formatDate } from "../utils/formatDate";

const API_KEY = "063f1d50791f7f275acde73b162729f2";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetailType {
  id: number;
  backdrop_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
  runtime: number;
}

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(res.data);
      } catch {
        setMovie(null);
      }
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <div className={styles.container}>Carregando detalhes...</div>;

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={IMAGE_BASE + movie.backdrop_path}
        alt={movie.title}
      />
      <h1 className={styles.title}>{movie.title}</h1>
      <p className={styles.date}>Lançamento: {formatDate(movie.release_date)}</p>
      <p className={styles.vote}>Nota: {movie.vote_average}</p>
      <p className={styles.overview}>{movie.overview}</p>
      <p className={styles.info}>
        <strong>Gêneros:</strong> {movie.genres.map((g) => g.name).join(", ")}
      </p>
      <p className={styles.info}>
        <strong>Duração:</strong> {movie.runtime} min
      </p>
    </div>
  );
}
