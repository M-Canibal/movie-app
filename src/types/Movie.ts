export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview?: string;        // opcional, descrição do filme
  backdrop_path?: string | null; // opcional, imagem maior para detalhes
  // Você pode adicionar mais campos conforme necessidade
}
