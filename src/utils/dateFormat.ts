import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function formatDate(dateString: string): string {
  try {
    return format(new Date(dateString), "dd 'de' MMM 'de' yyyy", {
      locale: ptBR,
    });
  } catch {
    return dateString;
  }
}
