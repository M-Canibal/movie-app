export function getRatingColor(vote: number): string {
  if (vote >= 7) return "#16a34a"; // verde-emerald-600
  if (vote >= 5) return "#facc15"; // amarelo-400
  return "#dc2626"; // vermelho-600
}