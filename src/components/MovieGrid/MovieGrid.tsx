import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieGrid.module.css";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
}

interface Props {
  movies: Movie[];
}

export default function MovieGrid({ movies }: Props) {
  if (movies.length === 0) {
    return <div className={styles.empty}>Nenhum filme encontrado.</div>;
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
